import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { generateSignedUrl } from "@/server/r2/r2";
import { createImage } from "../database/image";
import { createVideo } from "../database/video";

export const uploadRouter = createTRPCRouter({
  // create image to db
  createImage: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const image = await createImage(input.url);
      return image;
    }),

  // 取得簽名 URL
  getSignedUrl: publicProcedure
    .input(
      z.object({
        key: z.string(),
        size: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const signedUrl = await generateSignedUrl({
        key: input.key,
        size: input.size,
      });
      return signedUrl;
    }),

  // create video to db
  createVideo: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const video = await createVideo(input.url);
      return video;
    }),
});
