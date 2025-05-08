import { Box } from '@mui/material';
import { Diagnosis, OccupationalHealthCareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
 entry: OccupationalHealthCareEntry,
 diagnoses: Diagnosis[],
}

export const OccupationalEntry = ({entry, diagnoses}: Props) => {
  return (
    <Box key={entry.id} sx={{border:1, borderRadius:1, margin:1, padding:1}}>
      <p>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></p>
      <p><i>{entry.description}</i></p>
      <ul>
          {   
              entry.diagnosisCodes?.map((diagnosisCode,i) => 
              {  
                  const diagnosesData = diagnoses
                      .find((diagnose) => diagnosisCode === diagnose.code );

                  return <li key={i}><p>{diagnosisCode} {diagnosesData?.name}</p></li>;
              }
                  
              )
          }
      </ul>
      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};
