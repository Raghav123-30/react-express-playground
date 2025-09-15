import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();

const messageSchema = z.object({ message: z.string() });

type Message = z.infer<typeof messageSchema>;

const messages: Message[] = [
  { message: "Hi there" },
  { message: "How are you" },
  { message: "I am fine, what about you?" },
  { message: "I am doing great.Thank you" },
  { message: "Thank you for your thank you" },
];

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Welcome ${input.name}` };
    }),
  storeMessage: t.procedure.input(messageSchema).mutation(({ input }) => {
    messages.push({ message: input.message });
    return { message: "Your message has been stored successfully." };
  }),
  getMessages: t.procedure.query(() => {
    return { messages };
  }),
});

export type AppRouter = typeof appRouter;
