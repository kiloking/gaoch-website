import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as cheerio from "cheerio";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  updateNewsVisibility,
} from "../database/news"; // 引入 CRUD 函數

export const newsRouter = createTRPCRouter({
  fetch: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(input.url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // 取得網頁標題
        const title =
          $('meta[property="og:title"]').attr("content") ||
          $("title").text() ||
          $('meta[name="title"]').attr("content");

        // 取得縮圖
        const image =
          $('meta[property="og:image"]').attr("content") ||
          $('meta[name="image"]').attr("content");

        return { title, image };
      } catch (error) {
        throw new Error("無法處理此網址");
      }
    }),

  // 獲取所有新聞
  readAll: publicProcedure.query(async () => {
    return await getAllNews();
  }),

  // 創建新聞
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        image: z.string().optional(),
        url: z.string(),
        isVisible: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return await createNews(input);
    }),

  // 更新新聞
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        image: z.string(),
        url: z.string(),
        isVisible: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return await updateNews(input.id, input);
    }),

  // 刪除新聞
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteNews(input.id);
    }),

  isVisible: publicProcedure
    .input(z.object({ id: z.number(), isVisible: z.boolean() }))
    .mutation(async ({ input }) => {
      return await updateNewsVisibility(input.id, input.isVisible);
    }),
});
