import { z } from "zod";
import { newPatientSchema } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;
