import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
import { z } from 'zod';

const dischargeSchema = z.object({
    dischargeDate: z.string().date(),
    criteria: z.string().min(3, { message: "criteria required" })
});

const sickLeaveSchema = z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
});

export const healthCheckSchema = z.object({
    type: z.literal("HealthCheck"),
    description: z.string().trim().min(3, { message: "description required" }),
    date: z.string().date(),
    specialist: z.string().min(3, { message: "specialist required" }),
    diagnosisCodes: z.string().array().optional(),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const hospitalSchema = z.object({
    type: z.literal("Hospital"),
    description: z.string().trim().min(3, { message: "description required" }),
    date: z.string().date(),
    specialist: z.string().min(3, { message: "specialist required" }),
    diagnosisCodes: z.string().array().optional(),
    discharge: dischargeSchema
});

export const OccupationalEntrySchema = z.object({
    type: z.literal("OccupationalHealthcare"),
    description: z.string().trim().min(3, { message: "description required" }),
    date: z.string().date(),
    specialist: z.string().min(3, { message: "specialist required" }),
    diagnosisCodes: z.string().array().optional(),
    sickLeave: sickLeaveSchema.optional()
});

export const newPatientSchema = z.object({
    name: z.string().trim().min(1, { message: "name required" }),
    dateOfBirth: z.string().date(),
    ssn: z.string().trim().min(1, { message: "social security number required" }),
    gender: z.nativeEnum(Gender),
    occupation: z.string().trim().min(1, { message: "occupation required" }),
    // entries: z.array(entriesSchema)
});

const toNewPatient = (object: unknown): NewPatientEntry => {
    return newPatientSchema.parse(object);
};

export default toNewPatient;