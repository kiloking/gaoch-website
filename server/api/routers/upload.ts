import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { generateSignedUrl } from "@/server/r2/r2";
import { createImage } from "../database/image";

export const uploadRouter = createTRPCRouter({
  // create image to db
  createImage: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const image = await createImage(input.url);
      return image;
    }),

  // 取得簽名 URL
  getSignedUrl: publicProcedure
    .input(
      z.object({
        key: z.string(),
        size: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const signedUrl = await generateSignedUrl({
        key: input.key,
        size: input.size,
      });
      return signedUrl;
    }),
});
function uploadImageToR2(
  buffer: Buffer<ArrayBuffer>,
  fileName: string,
  fileType: string
) {
  throw new Error("Function not implemented.");
}
