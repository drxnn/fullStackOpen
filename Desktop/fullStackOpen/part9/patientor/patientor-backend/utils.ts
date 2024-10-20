import { z } from "zod";
import { NewPatientEntry, Gender, Diagnose, EntryType } from "./types";

// parse things here from req body

const DiagnosisCodeSchema = z.string() as z.ZodType<Diagnose["code"]>;

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.number(),
});

export const OccupationalHealthCareSchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string().optional(),
  sickLeave: z
    .object({
      startData: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthCareSchema,
  HospitalEntrySchema,
]);

export const newEntryWithIdSchema = z.intersection(
  z.object({
    id: z.string(),
  }),
  newEntrySchema
);
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(newEntryWithIdSchema).optional().default([]),
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
