import express from "express";

const app = express();
import cors from "cors";
import diagnosesData from "./data/diagnoses";
import { NonSensitivePatientData } from "./data/patients";
// console.log(diagnosesData);
import patientData from "./data/patients";
import toNewPatient from "./utils";
import { v4 as uuidv4 } from "uuid";

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

app.post("/api/patients", (req, res) => {
  try {
    const newPatientEntry = { id: uuidv4(), ...toNewPatient(req.body) };
    patientData.push(newPatientEntry);
    res.json(newPatientEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .send({ error: `Something went wront. Error: ${error.message}` });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
