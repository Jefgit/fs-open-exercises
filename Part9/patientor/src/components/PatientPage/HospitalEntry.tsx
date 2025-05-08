import { Diagnosis, HospitalEntry } from '../../types';
import { Box } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface Prop {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}
export const HospitalEntryComponent = ({entry, diagnoses}: Prop) => {
    
  return (
    <Box key={entry.id} sx={{border:1, borderRadius:1, margin:1, padding:1}}>
      <p>{entry.date} <MedicalInformationIcon /></p>
      <p><i>{entry.description}</i></p>
      <ul>
          {   
              entry.diagnosisCodes?.map((diagnosisCode,i) => 
              {  
                  const diagnosesData = diagnoses
                      .find((diagnose) => diagnosisCode === diagnose.code );

                  return <li key={i}><p> {diagnosesData?.code} {diagnosesData?.name}</p></li>;
              }
                  
              )
          }
      </ul>
      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};
