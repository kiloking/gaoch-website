import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const worksRouter = createTRPCRouter({
  // 獲取所有作品
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.work.findMany({
      include: {
        images: true,
        bgimg: {
          select: {
            url: true,
          },
        },
      },
    });
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
              url: true,
            },
          },
        },
      });
    }),
});
