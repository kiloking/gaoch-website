import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createWork, getAllWorks, updateWork } from "../database/work";
import { createWorkSchema } from "./types";

const workSchema = z.object({
  title: z.string(),
  year: z.string(),
  location: z.string(),
  description: z.string(),
  address: z.string(),
  area: z.string(),
  units: z.string(),
  floors: z.string(),
  houseTypes: z.string(),
  architect: z.string(),
  company: z.string(),
  ytVideoUrl: z.string().optional(),
  coverImageId: z.number().optional().nullable(),
  bgimgId: z.number().optional().nullable(),
});

export const worksRouter = createTRPCRouter({
  // 獲取所有作品
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await getAllWorks();
  }),

  // 獲取單一作品
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.work.findUnique({
        where: { id: input.id },
        include: {
          images: true,
          bgimg: {
            select: {
              id: true,
              url: true,
            },
          },
          coverImage: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      });
    }),

  // 新增作品
  create: publicProcedure
    .input(z.object({ data: createWorkSchema }))
    .mutation(async ({ input }) => {
      try {
        return await createWork(input.data);
      } catch (error) {
        console.error(error);
      }
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), data: createWorkSchema }))
    .mutation(async ({ input }) => {
      return await updateWork(input.id, input.data);
    }),

  getAdjacentWorks: publicProcedure
    .input(z.object({ currentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const [prev, next] = await Promise.all([
        // 查詢前一個作品
        ctx.prisma.work.findFirst({
          where: { id: { lt: input.currentId } },
          orderBy: { id: "desc" },
          include: {
            coverImage: true,
          },
        }),
        // 查詢後一個作品
        ctx.prisma.work.findFirst({
          where: { id: { gt: input.currentId } },
          orderBy: { id: "asc" },
          include: {
            coverImage: true,
          },
        }),
      ]);

      return { prev, next };
    }),
});
