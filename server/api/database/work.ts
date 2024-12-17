import db from "@/lib/server/db";
import { createWorkType } from "../routers/types";

//all works
export const getAllWorks = async () => {
  // if works is empty, return empty array
  const works = await db.work.findMany({
    include: {
      coverImage: true,
      bgimg: true,
    },
  });
  if (works.length === 0) {
    return [];
  }
  return works;
};

export const createWork = async (data: createWorkType) => {
  try {
    const payload = {
      ...data,
      ...(data.coverImageId !== undefined && {
        coverImageId: data.coverImageId,
      }),
      ...(data.bgimgId !== undefined && { bgimgId: data.bgimgId }),
    };
    return await db.work.create({
      data: payload,
    });
  } catch (error) {
    console.error(error);
  }
};

//update work
export const updateWork = async (id: number, data: createWorkType) => {
  try {
    const payload = {
      ...data,
      ...(data.coverImageId !== undefined && {
        coverImageId: data.coverImageId,
      }),
      ...(data.bgimgId !== undefined && { bgimgId: data.bgimgId }),
    };
    return await db.work.update({
      where: { id },
      data: payload,
      include: {
        coverImage: true,
        bgimg: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
