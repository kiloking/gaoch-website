import { createTRPCRouter } from "./trpc";
import { repairRouter } from "./routers/repair";
import { worksRouter } from "./routers/works";
import { uploadRouter } from "./routers/upload";

export const appRouter = createTRPCRouter({
  repair: repairRouter,
  works: worksRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
