import { z } from "zod";
import { NewPatientEntry, Gender, Diagnose } from "./types";

// parse things here from req body

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

export default toNewPatient;
