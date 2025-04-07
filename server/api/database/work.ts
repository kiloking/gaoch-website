import db from "@/lib/server/db";
import { createWorkType } from "../routers/types";

//all works
export const getAllWorks = async () => {
  // if works is empty, return empty array
  const works = await db.work.findMany({
    include: {
      coverImage: true,
      bgimg: true,
      images: true,
    },
    orderBy: {
      year: "asc",
    },
  });
  if (works.length === 0) {
    return [];
  }
  return works;
};

export const createWork = async (data: createWorkType) => {
  try {
    const { images, ...restData } = data;
    const payload = {
      ...restData,
      ...(restData.coverImageId !== undefined && {
        coverImageId: restData.coverImageId,
      }),
      ...(restData.bgimgId !== undefined && { bgimgId: restData.bgimgId }),
    };

    return await db.work.create({
      data: {
        ...payload,
        ...(images &&
          images.length > 0 && {
            images: {
              connect: images.map((img) => ({ id: img.id })),
            },
          }),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//update work
export const updateWork = async (id: number, data: createWorkType) => {
  try {
    const { images, ...restData } = data;
    const payload = {
      ...restData,
      ...(restData.coverImageId !== undefined && {
        coverImageId: restData.coverImageId,
      }),
      ...(restData.bgimgId !== undefined && { bgimgId: restData.bgimgId }),
    };

    return await db.work.update({
      where: { id },
      data: {
        ...payload,
        ...(images && {
          images: {
            set: [],
            connect: images.map((img) => ({ id: img.id })),
          },
        }),
      },
      include: {
        coverImage: true,
        bgimg: true,
        images: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//del work
export const deleteWork = async (id: number) => {
  return await db.work.delete({
    where: { id },
  });
};
