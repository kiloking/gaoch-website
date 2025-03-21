import db from "@/lib/server/db";
import { z } from "zod";

// 定義新聞資料的類型
export type CreateNewsType = {
  title: string;
  image?: string;
  url: string;
  isVisible?: boolean;
};

// 獲取所有新聞
export const getAllNews = async () => {
  const news = await db.news.findMany({
    orderBy: {
      createdAt: "desc", // 根據創建時間排序
    },
  });
  return news.length === 0 ? [] : news;
};

// 創建新聞
export const createNews = async (data: CreateNewsType) => {
  try {
    return await db.news.create({
      data: {
        ...data,
        isVisible: data.isVisible ?? true, // 預設為顯示
        image: data.image ?? "",
      },
    });
  } catch (error) {
    console.error("Error creating news:", error);
    throw new Error("無法創建新聞");
  }
};

// 更新新聞
export const updateNews = async (id: number, data: CreateNewsType) => {
  try {
    return await db.news.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    throw new Error("無法更新新聞");
  }
};

// 刪除新聞
export const deleteNews = async (id: number) => {
  try {
    return await db.news.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    throw new Error("無法刪除新聞");
  }
};

// 更新新聞的顯示狀態
export const updateNewsVisibility = async (id: number, isVisible: boolean) => {
  try {
    return await db.news.update({
      where: { id },
      data: { isVisible },
    });
  } catch (error) {
    console.error("Error updating news visibility:", error);
    throw new Error("無法更新新聞的顯示狀態");
  }
};
