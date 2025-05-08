import express, { Request, Response, NextFunction } from "express";
import { NewDiagnosisEntry, NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import patientService from "../services/patientService";
import { healthCheckSchema, hospitalSchema, newPatientSchema, OccupationalEntrySchema } from "../utils";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res: Response<NonSensitivePatientEntry>) => {
    const id = req.params.id;
    res.send(patientService.getPatient(id));
});

const parsePatient = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const parseEntry = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const { type } = req.body as NewDiagnosisEntry;

        switch (type) {
            case "Hospital":
                hospitalSchema.parse(req.body);
                next();
                break;
            case "OccupationalHealthcare":
                OccupationalEntrySchema.parse(req.body);
                next();
                break;
            case "HealthCheck":
                healthCheckSchema.parse(req.body);
                next();
                break;
            default:
                break;
        }
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

type Userparams = {
    id: string;
};

router.post('/:id/entries', parseEntry, (req: Request<Userparams, unknown, NewDiagnosisEntry>,
    res: Response<Patient[]>) => {
    const { id } = req.params;
    const addedDiagnosisEntry = patientService.addDiagnosis(req.body, id);

    res.json(addedDiagnosisEntry);
});

router.use(errorMiddleware);

export default router;