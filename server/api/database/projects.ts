import db from "@/lib/server/db";
import { createProjectType } from "../routers/types";

//all projects
export const getAllProjects = async () => {
  // if projects is empty, return empty array
  const projects = await db.project.findMany({
    include: {
      coverImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (projects.length === 0) {
    return [];
  }
  return projects;
};

//create project
export const createProject = async (data: createProjectType) => {
  try {
    const payload = {
      ...data,
      ...(data.coverImageId !== undefined && {
        coverImageId: data.coverImageId,
      }),
    };
    return await db.project.create({
      data: payload,
    });
  } catch (error) {
    console.error(error);
  }
};

//update project
export const updateProject = async (id: number, data: createProjectType) => {
  try {
    const payload = {
      ...data,
      ...(data.coverImageId !== undefined && {
        coverImageId: data.coverImageId,
      }),
    };
    return await db.project.update({
      where: { id },
      data: payload,
      include: {
        coverImage: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//del project
export const deleteProject = async (id: number) => {
  try {
    return await db.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
  }
};
