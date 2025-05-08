import { Button, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Diagnosis, Patient } from "../../types";
import { Entries } from "./Entries";
import AddEntryModal from "../AddEntryModal";
import { useState } from "react";

interface Props {
    patient: Patient | null | undefined;
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
    diagnoses: Diagnosis[];
}

export const PatientPage = ({patient, setPatients, diagnoses} : Props) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
    // const [error, setError] = useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      // setError(undefined);
    };

  const gender = 
    patient?.gender === "male" ? <MaleIcon /> :
    patient?.gender === "female" ? <FemaleIcon />
    : <TransgenderIcon />;

  return (
    <div>
      {patient
        && 
        <div>
          <Typography variant="h5">{patient.name} <span>{gender}</span></Typography>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <AddEntryModal setPatients={setPatients} modalOpen={modalOpen} onClose={closeModal}/>
          {/* <EntryForm setPatients={setPatients}/> */}
          {
            <Entries patient={patient} diagnoses = {diagnoses}/>
          }
          <Button variant="contained" onClick={openModal} color="primary">ADD NEW ENTRY</Button>     
        </div>
      }
      
    </div>
  );
};
