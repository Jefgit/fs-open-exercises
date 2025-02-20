interface values {
    value1: number,
    value2: number[]
}

interface input {
    daily_exercises: number[],
    target: number;
}

interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const checkArgument = (args: input): values => {
    const values = args.daily_exercises.concat(args.target);
    const withNaN = values.find((value) => isNaN(Number(value)));

    if (withNaN) {
        throw new Error('malformatted parameters');
    } else {
        const trainingDays = values.filter((_value, i) => i < values.length - 1);
        const value2 = trainingDays.map((value) => Number(value));
        return {
            value1: Number(values[values.length - 1]),
            value2: value2
        };
    }
};

export const calculateExercises = (dailyHours: number[], target: number): result => {
    const trainingDays = dailyHours.filter((d) => Number(d) !== 0);
    const total = dailyHours.reduce((acc: number, curr: number): number => {
        const total = acc + curr;

        return total;
    });

    const average = total / dailyHours.length;

    let rating = { rate: 0, description: '' };

    if (target <= average) {
        rating = { rate: 3, description: 'congratulations target achieved' };
    } else if (average < target && average > 0) {
        rating = { rate: 2, description: "not too bad but could be better" };
    } else {
        rating = { rate: 1, description: 'too lazy please improve your workout' };
    }

    return ({
        periodLength: dailyHours.length,
        trainingDays: trainingDays.length,
        success: target <= average,
        rating: rating.rate,
        ratingDescription: rating.description,
        target: target,
        average: average
    });
};

// try {
//     const { value1, value2 } = checkArgument(process.argv);
//     calculateExercises(value2, value1);
// } catch (error: unknown) {
//     let errorMessage = "Something bad happened.";

//     if (error instanceof Error) {
//         errorMessage += " Error: " + error.message;
//     }
//     console.log(errorMessage);
// }
