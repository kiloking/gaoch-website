import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAllRepair, getRepairById } from "../database/repair";
import { PrismaClient } from "@prisma/client";

// 定義表單資料的驗證 schema
const repairSchema = z.object({
  unit: z.string().min(1, "請填寫戶別"),
  contactName: z.string().min(1, "請填寫聯絡人"),
  phone: z.string().min(1, "請填寫聯絡電話"),
  content: z.string().min(1, "請填寫維修內容"),
  date: z.string(),
  images: z.array(z.number()).optional(),
  status: z.string(),
  community_code: z.string(),
  community_name: z.string(),
  email: z.string().optional().nullable(),
  contact_time: z.string(),
  repair_area: z.string(),
  repair_class: z.string(),
  videoId: z.number().nullable(),
});

const generateSerialNo = async (
  prisma: PrismaClient,
  community_code: string
): Promise<string> => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // 取後兩位
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const prefix = `${community_code}${year}${month}${day}`;

  // 查詢今天的最後一筆編號
  const lastRepair = await prisma.repair.findFirst({
    where: {
      serial_no: {
        startsWith: prefix,
      },
    },
    orderBy: {
      serial_no: "desc",
    },
  });

  // 產生新的序號
  const sequence = lastRepair
    ? String(Number(lastRepair.serial_no.slice(-3)) + 1).padStart(3, "0")
    : "001";

  return `${prefix}${sequence}`;
};

export const repairRouter = createTRPCRouter({
  create: publicProcedure
    .input(repairSchema)
    .mutation(async ({ ctx, input }) => {
      const serialNo = await generateSerialNo(ctx.prisma, input.community_code);

      try {
        const repair = await ctx.prisma.repair.create({
          data: {
            ...input,
            serial_no: serialNo,
            images: input.images
              ? {
                  connect: input.images.map((id) => ({ id })),
                }
              : undefined,
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
    const repair = await getRepairById(parseInt(input));
    if (!repair) throw new Error("找不到此維修單");
    return repair;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return getAllRepair();
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
