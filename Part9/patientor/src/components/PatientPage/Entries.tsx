import { Typography } from "@mui/material";
import { Diagnosis, Entry, Patient } from "../../types";
import { HospitalEntryComponent } from "./HospitalEntry";
import { OccupationalEntry } from "./OccupationalEntry";
import { HealthCheck } from "./HealthCheck";

interface Props {
    patient: Patient,
    diagnoses: Diagnosis[],
}

export const Entries = ({patient, diagnoses}: Props) => {

    const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
        switch(entry.type) {
            case "Hospital":
                return <HospitalEntryComponent key={entry.id} entry = {entry} diagnoses = {diagnoses} />;
            case "OccupationalHealthcare":
                return <OccupationalEntry key={entry.id} entry = {entry} diagnoses = {diagnoses}/>;
            case "HealthCheck":
                return <HealthCheck key={entry.id} entry = {entry} diagnoses = {diagnoses}/>;
            default:
                // return assertNever(entry);
        }
    };

  return (
    <div>
        <Typography variant="h6">Entries</Typography>
        {   
           patient.entries
            .map((entry) => EntryDetails({entry}))
        }
    </div>  
  );
};
