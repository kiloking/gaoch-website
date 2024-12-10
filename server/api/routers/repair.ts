import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// 定義表單資料的驗證 schema
const repairSchema = z.object({
  type: z.enum(["公設", "非公設"]),
  unit: z.string().min(1, "請填寫戶別"),
  contactName: z.string().min(1, "請填寫聯絡人"),
  phone: z.string().min(1, "請填寫聯絡電話"),
  content: z.string().min(1, "請填寫維修內容"),
  date: z.string(),
});

export const repairRouter = createTRPCRouter({
  create: publicProcedure
    .input(repairSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const repair = await ctx.prisma.repair.create({
          data: {
            ...input,
            status: "待處理",
          },
        });
        return {
          status: "success",
          data: repair,
        };
      } catch (error) {
        console.error("維修單建立失敗:", error);
        throw new Error("維修單建立失敗，請稍後再試");
      }
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const repair = await ctx.prisma.repair.findUnique({
      where: { id: parseInt(input) },
    });
    if (!repair) throw new Error("找不到此維修單");
    return repair;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.repair.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.repair.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
