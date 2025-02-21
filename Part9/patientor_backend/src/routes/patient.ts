import express, { Request, Response, NextFunction } from "express";
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import patientService from "../services/patientService";
import { newPatientSchema } from "../utils";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatients());
});

const parsePatient = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', parsePatient, (req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient>) => {
    const addedPatientEntry = patientService.addPatient(req.body);
    res.json(addedPatientEntry);
});

router.use(errorMiddleware);

export default router;