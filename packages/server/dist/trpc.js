import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();
export const appRouter = t.router({
    hello: t.procedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
        return { message: `Welcome ${input.name}` };
    }),
    storeMessage: t.procedure
        .input(z.object({ message: z.string() }))
        .mutation(({ input }) => {
        console.log(input);
        return { message: "Your message has been stored successfully." };
    }),
});
//# sourceMappingURL=trpc.js.map