import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Welcome ${input.name}` };
    }),
});

export type AppRouter = typeof appRouter;
