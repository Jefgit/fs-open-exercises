import { newPatientSchema } from "./utils";
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

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export interface Patient extends NewPatientEntry {
    id: string;
}
