// Write a function calculateExercises that calculates the average time of daily exercise hours, compares it to the target amount of daily hours and returns an object that includes the following values:
// the number of days
// the number of training days
// the original target value
// the calculated average time
// boolean value describing if the target was reached
// a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
// a text value explaining the rating, you can come up with the explanations
interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface terminalArgs {
  values: number[];
}

// parse arguments so you can pass them from command line:
const parseExerciseArguments = (args: string[]): terminalArgs => {
  let argsSliced = args.slice(2);
  let argsToNum = argsSliced.map((e) => {
    return Number(e);
  });
  const arr: number[] = [];
  for (const arg of argsToNum) {
    if (!isNaN(arg)) {
      arr.push(arg);
    }
  }
  return {
    values: arr,
  };
};

// console.log(parseExerciseArguments(process.argv));

const calculateExercises = (daysAndTarget: terminalArgs): Exercises => {
  let success: boolean;
  let ratingDescription: string = "";
  const target = daysAndTarget.values[daysAndTarget.values.length - 1];
  const hours = daysAndTarget.values.slice(0, -1);

  const trainingDays = hours.filter((hour) => hour > 0).length;
  const totalHours = hours.reduce((acc, c) => {
    return (acc += c);
  }, 0);

  let periodLength = hours.length;

  const average = totalHours / hours.length;

  const rating = average >= target ? 3 : average >= target * 0.9 ? 2 : 1;

  success = average >= target;
  ratingDescription =
    average > target ? "Pretty good" : "Not bad but could be better";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const arguments = parseExerciseArguments(process.argv);
  console.log(calculateExercises(arguments));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Something went wrong: ${error.message}`);
  }
}
