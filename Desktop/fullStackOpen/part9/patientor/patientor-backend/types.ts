import { z } from "zod";
import {
  newEntrySchema,
  newEntryWithIdSchema,
  newPatientSchema,
} from "./utils";

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

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
  entries: NewEntry[];
}

export type NewEntry = z.infer<typeof newEntryWithIdSchema>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export type NonSensitivePatientData = Omit<Patient, "ssn">;

// Define Entry without the 'id' property
export type EntryWithoutId = z.infer<typeof newEntrySchema>;
