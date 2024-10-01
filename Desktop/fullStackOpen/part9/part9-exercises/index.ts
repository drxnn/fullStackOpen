import express, { Request, Response } from "express";
import { calculateBMI } from "./calculateBmi";
import { calculateExercises, terminalArgs } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log("dailyexercises and target:", daily_exercises, target);
  console.log(req.body);

  console.log(typeof daily_exercises, typeof target);
  if (
    !daily_exercises ||
    !target ||
    !Array.isArray(daily_exercises) ||
    typeof target !== "number"
  ) {
    res.status(400).send({ error: "malformatted data" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const objWithArguments = { values: [...daily_exercises, target] };

  const result = calculateExercises(objWithArguments as terminalArgs);
  res.send(result);
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
