import { createTRPCRouter } from "./trpc";
import { repairRouter } from "./routers/repair";
import { worksRouter } from "./routers/works";

export const appRouter = createTRPCRouter({
  repair: repairRouter,
  works: worksRouter,
});

export type AppRouter = typeof appRouter;
