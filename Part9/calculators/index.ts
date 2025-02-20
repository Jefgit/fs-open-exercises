import express from 'express';
const app = express();
import { parseArgument, calculateBmi } from './bmiCalculator';
import { calculateExercises, checkArgument } from './exerciseCalculator';

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
    const bmiData: any = req.query

    try {
        const { value1, value2 } = parseArgument(bmiData)
        const result = calculateBmi(value1, value2)

        res.status(200).json(result)
    } catch (error: unknown) {
        let errorMessage = ''

        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).json({ error: errorMessage })
    }

})

app.post("/exercises", (req, res) => {
    const body = req.body;
    console.log(body.target);

    try {
        const { value1, value2 } = checkArgument(body);
        const result = calculateExercises(value2, value1)

        res.status(200).json(result)
    } catch (error: unknown) {
        let errorMessage = "";

        if (error instanceof Error) {
            errorMessage += error.message;
        }

        res.status(400).json(errorMessage);
    }


})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})