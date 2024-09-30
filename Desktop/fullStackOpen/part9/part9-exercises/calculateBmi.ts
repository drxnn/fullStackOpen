// calculate BMI
// take height in cm and weight in kg
// The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).

interface BmiValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4 || args.length > 4) {
    throw new Error("Incorrect num of args. Please provide 3 arguments");
  }
  console.log(args);
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBMI = (height: number, weight: number) => {
  let heightInMeters = height / 100;
  let bmi = weight / heightInMeters ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 24.9) {
    return "normal range";
  } else {
    return "overweight";
  }
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  calculateBMI(value1, value2);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Something went wrong: ${error.message}`);
  }
}
