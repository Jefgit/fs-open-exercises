import { Box } from '@mui/material';
import { Diagnosis, HealthCheckEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: HealthCheckEntry,
    diagnoses: Diagnosis[]
}
export const HealthCheck = ({entry, diagnoses}: Props) => {

  const rating = (entry: HealthCheckEntry) => {
    switch(entry.healthCheckRating) {
      case 0:
        return <FavoriteIcon sx={{color:'green'}}/>;
      case 1:
        return <FavoriteIcon sx={{color:'#9ACD32'}}/>;
      case 2: 
      return <FavoriteIcon sx={{color:'yellow'}}/>;
      case 3:
        return <FavoriteIcon sx={{color:'red'}}/>;
    }
  };

  
  return (
    <Box key={entry.id} sx={{border:1, borderRadius:1, margin:1, padding:1}}>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <p><i>{entry.description}</i></p>
      <ul>
          {   
              entry.diagnosisCodes?.map((diagnosisCode,i) => 
              {  
                  const diagnosesData = diagnoses
                      .find((diagnose) => diagnosisCode === diagnose.code );

                  return <li key={i}><p>{diagnosesData?.name}</p></li>;
              }
                  
              )
          }
      </ul>
      <p>{rating(entry)}</p>
      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};
