// calculate BMI
// take height in cm and weight in kg
// The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).

const calculateBMI = (height: number, weight: number): string => {
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

console.log(calculateBMI(184, 60));
