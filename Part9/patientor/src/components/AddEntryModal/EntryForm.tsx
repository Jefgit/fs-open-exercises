import { Alert, Box, Button, FormControlLabel, FormLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientService from '../../services/patients';
import { HealthCheckRating, NewDiagnosisEntry, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface Props {
     setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
     onCancel: () => void;
}

type entry = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export const EntryForm = ({setPatients, onCancel} : Props) => {
    const [entryType, setEntryType] = useState<entry>('Hospital');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [error, setError] = useState<string>();
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const codes = [
      "M24.2",
      "M51.2",
      "S03.5",
      "J10.1",
      "J06.9"
    ];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
      const  {
        target: {value},
      } = event;

      setDiagnosisCodes(
        typeof value === "string" ? value.split(',') : value,
      );
    };

    

    const match = useMatch('/patients/:id');
    const id = match?.params.id;
    
    // const onRatingChange = (event: SelectChangeEvent<string>) => {
    //     event.preventDefault();
    //     if ( typeof event.target.value === "string") {
    //       const value = event.target.value;
    //       const rate = Object.values(HealthCheckRating).find(g => g.toString() === value);
    //       if (rate) {
    //         setRating(rate);
    //       }
    //     }
    //   };

    const createNewEntry = async (e: SyntheticEvent) => {
        e.preventDefault();
        // const diagnosisCodes = codes.split(",") as Array<Diagnosis['code']>;
        const type = entryType;
        let data = {};
        try {

          switch (type) {
            case "Hospital":
              const discharge = {
                dischargeDate,
                criteria
              };

              data = {
                type,
                description, 
                date, 
                specialist,
                diagnosisCodes,
                discharge,
              };
                break;
            case "OccupationalHealthcare":
              const sickLeave = {
                startDate,
                endDate,
              };

              data = {
                type,
                description, 
                date, 
                specialist,
                diagnosisCodes,
                sickLeave,
                employerName
              };
                break;

            case "HealthCheck":
              data = {
                type,
                description, 
                date, 
                specialist,
                diagnosisCodes,
                healthCheckRating,
              };
                break;

            default:
                break;
            }

            await patientService
            .createPatientEntry(data as NewDiagnosisEntry, id as string)
                .then(data => setPatients(data));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data) {
                  const { error } = e.response.data;
                  const messages = error.map((e: AxiosError) => e.message);
                  console.log(messages.toString());
                  const message = `Something went wrong. Error: ${messages.toString()}`;
                  console.error(message);
                  setError(message);
                } else {
                  setError("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                setError("Unknown error");
              }
            }
        
            setTimeout(()=> {
                setError('');
            },5000);
    };
    console.log(dischargeDate, date);
  return (
    <Box>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={createNewEntry}>
              <RadioGroup
              defaultValue={"Hospital"}
              onChange={e => setEntryType(e.target.value as entry)}
                >
              <FormLabel id="demo-radio-buttons-group-label">Entry Type</FormLabel>
                <FormControlLabel 
                  value={"Hospital"} 
                  control={<Radio/>} 
                  label="Hospital"
                />
                <FormControlLabel 
                value={"OccupationalHealthcare"} 
                control={<Radio/>} 
                label="Occupational Healthcare"
              />
                <FormControlLabel 
                value={"HealthCheck"} 
                control={<Radio/>} 
                label="Health Check"
              />
            </RadioGroup>
            <Typography variant="h5">New {entryType} entry</Typography>
            <TextField 
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
            />  
            <TextField 
                type="date"
                label="Date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
            /> 
            <TextField 
                label="Specialist"
                name="specialist"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                fullWidth
            />
            <Select
              id="multiple-diagnosis-codes"
              multiple
              value={diagnosisCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Diagnosis Code" />}
              MenuProps={MenuProps}
            >
              {codes.map((code)=>(
                <MenuItem
                  key={code}
                  value={code}
                >
                  {code}
                </MenuItem>
              ))}
            </Select>
            
              {entryType === "Hospital" ?
              <Box>
                <TextField 
                    type="date"
                    label="Discharge Date"
                    name="dischargeDate"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    fullWidth
                />
                <TextField 
                    label="Criteria"
                    name="criteria"
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    fullWidth
                />
            </Box>
            : <></>
            }
            {entryType === "OccupationalHealthcare" ?
              <Box>
                <TextField 
                    label="Employer Name"
                    name="employerName"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    fullWidth
                />
                <TextField 
                    type="date"
                    label="Sick leave start-date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                />
                <TextField 
                    type="date"
                    label="Sick leave end-date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                />
            </Box>
            : <></>
            }
            {
              entryType === "HealthCheck" 
              ? <Box>
              <TextField 
                label="Healthcheck rating"
                name="rating"
                value={healthCheckRating}
                onChange={(e) => setRating(Number(e.target.value))}
                fullWidth
            />
            </Box>
            : <></>
            }
            
            <Button type="button" variant="contained" onClick={onCancel} color="error">CANCEL</Button> 
            <Button type="submit" variant="contained" sx={{backgroundColor:"gray", color:"black"}}>ADD</Button>    
        </form>
    </Box>
  );
};
