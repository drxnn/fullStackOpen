export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
// | BaseEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export const enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

type BaseFormState = {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  type: string;
};

export type HealthCheckFormState = BaseFormState & {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
};

export type HospitalFormState = BaseFormState & {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
};

export type OccupationalHealthcareFormState = BaseFormState & {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type NewEntryFormState =
  | HealthCheckFormState
  | HospitalFormState
  | OccupationalHealthcareFormState
  | BaseFormState;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
