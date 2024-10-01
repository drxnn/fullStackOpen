import express, { Request, Response } from "express";
import { calculateBMI } from "./calculateBmi";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLO");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted datta" });
  }

  const result = calculateBMI(height, weight);
  res.send({
    height,
    weight,
    result,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
