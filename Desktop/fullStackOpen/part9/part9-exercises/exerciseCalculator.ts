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

// parse arguments so you can pass them from command line:
// const parseArguments = (args:string[]):

const calculateExercises = (
  hours: Array<number>,
  target: number
): Exercises => {
  let daysOfExercise: number = 0;
  let execiseInHours: number = 0;
  let success: boolean;
  let ratingDescription: string = "";
  hours.forEach((day) => {
    if (day !== 0) {
      daysOfExercise += 1;
      execiseInHours += day;
    }
  });

  let periodLength = hours.length;

  const average = execiseInHours / hours.length;
  average >= target ? (success = true) : (success = false);
  ratingDescription =
    average > target ? "Pretty good" : "Not bad but could be better";

  return {
    periodLength,
    trainingDays: daysOfExercise,
    success,
    rating: 2,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([2, 3, 1, 10, 2, 4, 1], 2));
