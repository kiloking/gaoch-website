import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import * as jose from "jose";

export const usersRouter = createTRPCRouter({
  // 更新用戶啟用狀態
  updateUserStatus: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 檢查當前用戶是否為管理員
      if (ctx.session.user.role !== "admin") {
        throw new Error("沒有權限執行此操作");
      }

      return await ctx.prisma.user.update({
        where: { id: input.userId },
        data: { isActive: input.isActive },
      });
    }),

  // 獲取所有用戶
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    // 檢查當前用戶是否為管理員
    if (ctx.session.user.role !== "admin") {
      throw new Error("沒有權限執行此操作");
    }

    return await ctx.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  createUser: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        role: z.enum(["admin", "user", "manager"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new Error("沒有權限執行此操作");
      }

      // 使用 jose 加密密碼
      const encodedPassword = await new jose.EncryptJWT({
        password: input.password,
      })
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(new TextEncoder().encode(process.env.JWT_SECRET!));

      return await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: encodedPassword,
          role: input.role,
          isActive: true,
        },
      });
    }),
});
