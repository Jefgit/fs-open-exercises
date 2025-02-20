import patientsData from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })
    );
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };

    patientsData.push(newPatient);

    return newPatient;
};

export default {
    getPatients,
    addPatient
};