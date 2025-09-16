var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc.js";
import cors from "cors";
const app = express();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
const students = [
    {
        name: "Raghavendra",
        age: 22,
    },
    {
        name: "Puneet",
        age: 23,
    },
];
const typeDefs = `
 type Greet{
    message:String
 }
  type Query{
    greet:Greet
  }
`;
const resolvers = {
    Query: {
        greet: () => ({ message: "Hello there" }),
    },
};
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));
app.get("/", (_, res) => {
    res.status(200).json({ students });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new ApolloServer({ typeDefs, resolvers });
    yield server.start();
    app.use("/graphql", cors(), express.json(), expressMiddleware(server));
    app.listen(3000, () => {
        console.log("Server ready on port 3000");
    });
});
startServer();
export * from "./trpc.js";
//# sourceMappingURL=index.js.map