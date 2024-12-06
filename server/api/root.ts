import { createTRPCRouter } from "./trpc";
import { repairRouter } from "./routers/repair";

export const appRouter = createTRPCRouter({
  repair: repairRouter,
});

export type AppRouter = typeof appRouter;
