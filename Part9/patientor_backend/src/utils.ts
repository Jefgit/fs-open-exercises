import { Gender, NewPatientEntry } from "./types";
import { z } from 'zod';

export const newPatientSchema = z.object({
    name: z.string().trim().min(1, { message: "name required" }),
    dateOfBirth: z.string().date(),
    ssn: z.string().trim().min(1, { message: "social security number required" }),
    gender: z.nativeEnum(Gender),
    occupation: z.string().trim().min(1, { message: "occupation required" })
});

const toNewPatient = (object: unknown): NewPatientEntry => {
    return newPatientSchema.parse(object);
};

export default toNewPatient;