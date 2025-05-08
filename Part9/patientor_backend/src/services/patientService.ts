import patientsData from "../../data/patients";
import { NewDiagnosisEntry, NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    })
    );
};

const getPatient = (id: string): Patient | undefined => {
    return patientsData.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };

    patientsData.push(newPatient);

    return newPatient;
};

const addDiagnosis = (diagnosis: NewDiagnosisEntry, patientId: string): Patient[] => {
    // const {diagnosisCodes} = diagnosis;
    // const codes = diagnosisCodes?.split(",") as Array<Diagnosis['code']>;
    // const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    //     if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    //         // we will just trust the data to be in correct form
    //         return [] as Array<Diagnosis['code']>;
    //     }

    //     return object.diagnosisCodes as Array<Diagnosis['code']>;
    // };

    const newEntry = {
        id: uuid(),
        ...diagnosis,
        // diagnosisCodes: parseDiagnosisCodes(diagnosis.diagnosisCodes),
    };

    switch (diagnosis.type) {
        case "Hospital":

            break;

        default:
            break;
    }

    const currentPatientData = <Patient>patientsData.find(patient => patient.id === patientId);

    currentPatientData.entries.push(newEntry);

    const updatedPatientData = patientsData
        .map(patient =>
            patient.id === patientId
                ? currentPatientData
                : patient);

    return updatedPatientData;

};

export default {
    getPatients,
    getPatient,
    addPatient,
    addDiagnosis
};