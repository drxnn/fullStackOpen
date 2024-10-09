import express, { NextFunction, Request, Response } from "express";

const app = express();
import cors from "cors";
import diagnosesData from "./data/diagnoses";
import { NonSensitivePatientData } from "./data/patients";
// console.log(diagnosesData);
import patientData from "./data/patients";
import { newPatientSchema } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { NewPatientEntry, Patient } from "./types";

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_request, response) => {
  response.send("HELLO THERE SIR");
});

app.get("/api/diagnoses", (_request, response) => {
  response.send(diagnosesData);
});

app.get("/api/patients", (_request, response) => {
  const dataToReturn: NonSensitivePatientData[] = patientData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      dateOfBirth: el.dateOfBirth,
      gender: el.gender,
      occupation: el.occupation,
    };
  });
  response.send(dataToReturn);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

app.post(
  "/api/patients",
  newPatientParser,
  errorMiddleware,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const newPatientEntry = {
      id: uuidv4(),
      ...req.body,
    };
    patientData.push(newPatientEntry);
    res.json(newPatientEntry);
  }
);

app.use(errorMiddleware);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
