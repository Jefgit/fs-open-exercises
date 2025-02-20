import express from "express";
import { Response } from "express";
import { NonSensitivePatientEntry } from "../types";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const addedPatientEntry = toNewPatient(req.body);
        res.json(addedPatientEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';

        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

export default router;