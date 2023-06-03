/* interface Values {
  value1: number;
  value2: number;
} */
/* 
const parseArgs = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}; */

export const calculateBmi = (height: number, weight: number): string => {
  /*   console.log(height, weight);
  let meters = height / 10;
  let squareOfHeight = meters * meters;
  let result = Number(((weight / squareOfHeight) * 100).toFixed(2)); */

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi > 16 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi >= 35 && bmi <= 39.9) {
    return "Obese (Class II)";
  } else if (bmi >= 40) {
    return "Obese (Class III)";
  } /* else {
    throw new Error("Must enter numbers above 0!");
  } */
  return "gurrl";
};

/* try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
 */
