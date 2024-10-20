import express, { NextFunction, Request, Response } from "express";

const app = express();
import cors from "cors";

import {
  EntryWithoutId,
  NewEntry,
  NonSensitivePatientData,
  Patient,
} from "./types";
// console.log(diagnosesData);
import patientData from "./data/patients";
import { newEntrySchema, newPatientSchema } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { z, ZodError } from "zod";
import { NewPatientEntry } from "./types";
import diagnosesRouter from "./routes/diagnoseRoute";

app.use(express.json());
app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_request, response) => {
  response.send("HELLO THERE SIR");
});

app.get("/api/patients", (_request, response) => {
  const dataToReturn: NonSensitivePatientData[] = patientData.map((el) => {
    return {
      id: el.id,
      name: el.name,
      dateOfBirth: el.dateOfBirth,
      gender: el.gender,
      occupation: el.occupation,
      entries: el.entries,
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
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NonSensitivePatientData>
  ) => {
    const newPatientEntry = {
      id: uuidv4(),
      ...req.body,
      entries: [],
    };
    patientData.push(newPatientEntry);
    res.json(newPatientEntry);
  }
);

const parseEntry = (entry: EntryWithoutId): NewEntry => {
  const entryToReturn = newEntrySchema.parse(entry);
  const newEntry = {
    id: uuidv4(),
    ...entryToReturn,
  };

  return newEntry;
};

app.post(
  "/api/patients/:id/entries",
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<NewEntry | { error: string }>
  ) => {
    const { id } = req.params;
    console.log(id, typeof id);

    const patientToAddEntryTo = patientData.find((el) => el.id === id);
    console.log(patientToAddEntryTo);
    if (!patientToAddEntryTo) {
      res.status(400).send({ error: "something went wrong" });
      return;
    }

    let newEntry: NewEntry | undefined;
    try {
      newEntry = parseEntry(req.body);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).send({ error: "Something went wrong" });
        return;
      } else {
        res.status(500).send({ error: "Failed to parse entry" });
        return;
      }
    }
    try {
      console.log("body is ", req.body);

      if (!patientToAddEntryTo.entries) {
        patientToAddEntryTo.entries = [];
      }

      console.log("new entry", newEntry);
      if (newEntry) patientToAddEntryTo.entries.push(newEntry);
      res.status(200).send(newEntry);
    } catch (err) {
      res.status(500).send({ error: `Something went wrong!. Error: ${err}` });
    }
  }
);

app.get(
  "/api/patients/:id",
  (req, res: Response<Patient | { error: string }>) => {
    const { id } = req.params;
    console.log("this is the id", id);
    if (!id) {
      res.status(404).send({ error: "couldnt find anything fam :/" });
      return;
    }
    const patientToReturn = patientData.find((el) => el.id === id);
    console.log(patientToReturn);
    if (patientToReturn) {
      res.json(patientToReturn);
    }
  }
);

app.use(errorMiddleware);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
