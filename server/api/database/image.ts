import db from "@/lib/server/db";

export const createImage = async (url: string) => {
  const payload = {
    url,
  };
  const createdImage = await db.image.create({
    data: {
      ...payload,
    },
  });
  return createdImage;
};
