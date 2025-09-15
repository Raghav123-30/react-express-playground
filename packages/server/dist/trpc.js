var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();
const messageSchema = z.object({ message: z.string() });
const messages = [
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
    storeMessage: t.procedure.input(messageSchema).mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        yield new Promise((r) => setTimeout(r, 3000));
        messages.push({ message: input.message });
        return { message: "Your message has been stored successfully." };
    })),
    getMessages: t.procedure.query(() => {
        return { messages };
    }),
});
//# sourceMappingURL=trpc.js.map