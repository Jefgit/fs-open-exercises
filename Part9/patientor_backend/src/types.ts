import { healthCheckSchema, hospitalSchema, newPatientSchema, OccupationalEntrySchema } from "./utils";
import { z } from 'zod';

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

interface BaseEntry {
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
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital"
    discharge: DischargeEntry
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    sickLeave?: SickLeaveEntry
    employerName: string
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;


export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatientEntry {
    id: string;
    entries: Entry[]
}

export type NewEntry = z.infer<typeof hospitalSchema>
    | z.infer<typeof OccupationalEntrySchema>
    | z.infer<typeof healthCheckSchema>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewDiagnosisEntry = UnionOmit<Entry, 'id'>;
