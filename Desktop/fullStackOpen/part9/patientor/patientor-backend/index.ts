import express from "express";
import { v1 as uuid } from "uuid";
const id = uuid();
const app = express();
import cors from "cors";
import diagnosesData from "./data/diagnoses";
import { NonSensitivePatientData } from "./data/patients";
// console.log(diagnosesData);
import patientData from "./data/patients";

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
