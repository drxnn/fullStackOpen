import { Patient, NewPatientEntry } from "./types";

// parse things here from req body

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing data");
  }
  return name;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrent or missing data");
  }
  const newPatient = {
    name: "blah",
    dateOfBirth: "blah",
    gender: "blah",
    occupation: "blah",
  };
  return newPatient;
};

export default toNewPatient;
