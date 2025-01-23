import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { createProjectSchema } from "./types";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../database/projects";
import { get } from "http";
import { create } from "domain";
export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await getAllProjects();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.project.findUnique({
        where: { id: input.id },
        include: {
          coverImage: true,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ data: createProjectSchema }))
    .mutation(async ({ input }) => {
      try {
        return await createProject(input.data);
      } catch (error) {
        console.error(error);
      }
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), data: createProjectSchema }))
    .mutation(async ({ input }) => {
      return await updateProject(input.id, input.data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteProject(input.id);
    }),
});
