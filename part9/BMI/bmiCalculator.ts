const calculateBmi = (n1: number, n2: number): string => {
  let meters = n1 / 10;
  let squareOfHeight = meters * meters;
  let result = Number(((n2 / squareOfHeight) * 100).toFixed(2));

  if (result < 16) {
    return "Underweight (Severe thinness)";
  } else if (result > 16 && result <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (result >= 17 && result <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (result >= 18.5 && result <= 24.9) {
    return "Normal range";
  } else if (result >= 25 && result <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (result >= 30 && result <= 34.9) {
    return "Obese (Class I)";
  } else if (result >= 35 && result <= 39.9) {
    return "Obese (Class II)";
  } else if (result >= 40) {
    return "Obese (Class III)";
  } else {
    throw new Error("Must enter numbers above 0!");
  }
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
