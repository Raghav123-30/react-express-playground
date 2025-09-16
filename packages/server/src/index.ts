import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc.js";
import cors from "cors";
const app = express();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
type Studnet = {
  name: string;
  age: number;
};

const students: Studnet[] = [
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
  
  input AddMessageInput{
     text:String!
     author:String!
  }
  type Message{
    text:String!
    author:String!
  }
    type Mutation{
      addMessage(input:AddMessageInput):Message!
    }
`;

const resolvers = {
  Query: {
    greet: () => ({ message: "Hello there" }),
  },
  Mutation: {
    addMessage(
      _: unknown,
      { input }: { input: { text: string; author: string } }
    ) {
      console.log(input);
      return input;
    },
  },
};

app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.get("/", (_, res) => {
  res.status(200).json({ students });
});

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
  app.listen(3000, () => {
    console.log("Server ready on port 3000");
  });
};

startServer();

export * from "./trpc.js";
