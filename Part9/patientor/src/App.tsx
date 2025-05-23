import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import { PatientPage } from "./components/PatientPage/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  
  const match = useMatch('/patients/:id');

  useEffect(()=> {
    match
    ? patientService.getPatient(match.params.id).then(data => setPatient(data))
    : {};
  },[match, patients]);
    
  console.log(patient);
  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  
  }, []);

  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route 
              path="/" 
              element={<PatientListPage patients={patients} setPatients={setPatients} 
              />} 
            />
            <Route path="/patients/:id" element={<PatientPage patient={patient} setPatients={setPatients} diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
