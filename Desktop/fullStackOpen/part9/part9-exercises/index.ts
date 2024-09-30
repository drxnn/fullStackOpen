import express from "express";
import { calculateBMI } from "./calculateBmi";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLO");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const result = calculateBMI(height, weight);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
