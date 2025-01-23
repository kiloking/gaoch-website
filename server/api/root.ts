import { createTRPCRouter } from "./trpc";
import { repairRouter } from "./routers/repair";
import { worksRouter } from "./routers/works";
import { uploadRouter } from "./routers/upload";
import { projectRouter } from "./routers/projects";

export const appRouter = createTRPCRouter({
  repair: repairRouter,
  works: worksRouter,
  upload: uploadRouter,
  projects: projectRouter,
});

export type AppRouter = typeof appRouter;
