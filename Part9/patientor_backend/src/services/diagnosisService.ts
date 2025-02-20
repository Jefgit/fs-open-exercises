import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosisData = (): Diagnosis[] => {
    return diagnosisData;
};

export default {
    getDiagnosisData,
};