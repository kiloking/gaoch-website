import db from "@/lib/server/db";

export const createVideo = async (url: string) => {
  const payload = {
    url,
  };
  const createVideo = await db.video.create({
    data: {
      ...payload,
    },
  });
  return createVideo;
};
