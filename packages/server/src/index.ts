import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc.js";
import cors from "cors";
const app = express();

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

app.use(cors());
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.get("/", (_, res) => {
  res.status(200).json({ students });
});

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

export * from "./trpc.js";
