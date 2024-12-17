import {
  HeadObjectCommand,
  HeadObjectCommandOutput,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID as string;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY as string;
const BUCKET_NAME = process.env.R2_BUCKET_NAME as string;
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
export const UPLOAD_PREFIX = "upload";

export const UPLOAD_MAX_IMAGE_SIZE = 1024 * 1024 * 3; // 3MB
export async function generateSignedUrl({
  key,
  size,
}: {
  key: string;
  size: number;
}) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentLength: size,
  });
  const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
  return url;
}

export async function checkFileExists({ key }: { key: string }) {
  const filename = `upload/${key}`;
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });
    const data: HeadObjectCommandOutput = await S3.send(command);
    if (data.$metadata.httpStatusCode !== 200) {
      throw new Error(`Invalid status code: ${data.$metadata.httpStatusCode}`);
    }

    return true;
  } catch (e) {
    if (
      e instanceof S3ServiceException &&
      e.$metadata?.httpStatusCode === 404
    ) {
      return false;
    }
    throw e;
  }
}

export async function uploadImage({
  key,
  buffer,
}: {
  key: string;
  buffer: Buffer;
}) {
  const filename = `upload/${key}`;
  const resultUrl = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;

  const exists = await checkFileExists({
    key,
  });
  if (exists) {
    return {
      state: "exists" as const,
      url: resultUrl,
    };
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer,
  });

  try {
    await S3.send(command);
    return {
      state: "success" as const,
      url: resultUrl,
    };
  } catch (error) {
    return {
      state: "error" as const,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const response = await S3.send(command);
    if (!response.Body) {
      throw new Error("No body");
    }
    const buffer = Buffer.from(await response.Body.transformToByteArray());
    return {
      state: "success" as const,
      buffer,
    };
  } catch (error) {
    return {
      state: "error" as const,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteMultipleImages(urls: string[]) {
  const Keys = [];

  for (const url of urls) {
    Keys.push(url.replace(`${process.env.NEXT_PUBLIC_S3_URL}/`, ""));
  }
  // Delete keys must be less than 1000
  const commands: DeleteObjectsCommand[] = [];
  for (let i = 0; i < Keys.length; i += 1000) {
    commands.push(
      new DeleteObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
          Objects: Keys.slice(i, i + 1000).map((Key) => ({ Key })),
        },
      })
    );
  }

  try {
    let deletedCount = 0;
    let batchCount = 0;
    for (const command of commands) {
      const { Deleted } = await S3.send(command);
      if (Deleted) {
        deletedCount += Deleted.length;
      }
    }

    return {
      count: deletedCount,
    };
  } catch (error) {
    return {
      state: "error" as const,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
