import axios from "axios";
import { NewDiagnosisEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string | undefined) => {
  return await axios
    .get<Patient>(`${apiBaseUrl}/patients/${id}`)
    .then(response => response.data);
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createPatientEntry = async (diagnosis: NewDiagnosisEntry, id: string) => {
  const { data } = await axios.post<Patient[]>(
    `${apiBaseUrl}/patients/${id}/entries`,
    diagnosis
  );

  return data;
};

export default {
  getAll,
  getPatient,
  create,
  createPatientEntry
};

