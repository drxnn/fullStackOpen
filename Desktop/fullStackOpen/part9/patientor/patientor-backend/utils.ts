import { z } from "zod";
import { NewPatientEntry, Gender } from "./types";

// parse things here from req body

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;
