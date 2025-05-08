export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeaveEntry {
  startDate: string;
  endDate: string;
}

export interface DischargeEntry {
  dischargeDate: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: DischargeEntry
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  sickLeave?: SickLeaveEntry
  employerName: string
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewDiagnosisEntry = UnionOmit<Entry, 'id'>;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
