interface bmiValues {
    value1: number,
    value2: number,
}

interface propertyPerson {
    height: string;
    weight: string;
}

interface result {
    height: number;
    weight: number;
    bmi: string;

}
const parseArgument = (args: propertyPerson): bmiValues => {

    if (!isNaN(Number(args.height)) && !isNaN(Number(args.weight))) {
        return {
            value1: Number(args.height),
            value2: Number(args.weight),
        };
    } else {
        throw new Error('malformatted parameters');
    }
};

const calculateBmi = (height: number, mass: number): result => {
    const bmi = mass / ((height / 100) * (height / 100));
    let evaluation = '';

    if (bmi < 16) {
        evaluation = 'Underweight (Severe thinness)';
    } else if (bmi >= 16 && bmi <= 16.9) {
        evaluation = 'Underweight (Moderate thinness)';
    } else if (bmi >= 17 && bmi <= 18.4) {
        evaluation = 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        evaluation = 'Normal range';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        evaluation = 'Overweight (Pre-obese)';
    } else if (bmi >= 30 && bmi <= 34.9) {
        evaluation = 'Obese (Class I)';
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        evaluation = 'Obese (Class II)';
    } else {
        evaluation = 'Obese (Class III)';
    }

    return {
        weight: mass,
        height: height,
        bmi: evaluation
    };
};

export { parseArgument, calculateBmi, propertyPerson };

