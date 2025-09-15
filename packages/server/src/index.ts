import express from "express";

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

app.get("/", (_, res) => {
  res.status(200).json({ students });
});

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});
