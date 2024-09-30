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
  const argumentsToPass = parseExerciseArguments(process.argv);
  console.log(calculateExercises(argumentsToPass));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Something went wrong: ${error.message}`);
  }
}
