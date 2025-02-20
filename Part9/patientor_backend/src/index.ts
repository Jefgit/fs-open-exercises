import express from 'express';
import cors from 'cors';
import diagnosisRouter from "../src/routes/diagnosis";
import patientRouter from "../src/routes/patient";
const app = express();

const PORT = 3001;

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());


app.get("/api/ping", (_req, res) => {
    res.send('pong');
});

app.use("/api/diagnoses", diagnosisRouter);

app.use("/api/patients", patientRouter);


app.get("api/patients", (_req, res) => {
    res.send();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});  