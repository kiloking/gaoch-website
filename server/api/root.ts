import { createTRPCRouter } from "./trpc";
import { repairRouter } from "./routers/repair";
import { worksRouter } from "./routers/works";
import { uploadRouter } from "./routers/upload";
import { projectRouter } from "./routers/projects";
import { newsRouter } from "./routers/news";
import { usersRouter } from "./routers/users";
export const appRouter = createTRPCRouter({
  repair: repairRouter,
  works: worksRouter,
  upload: uploadRouter,
  projects: projectRouter,
  news: newsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
