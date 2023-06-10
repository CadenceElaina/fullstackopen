const bmiMetricUnits = (height: number, weight: number): number => {
  if (height <= 0 || weight <= 0)
    throw new Error("Arguments must be greater than zero.");

  return weight / Math.pow(height / 100, 2);
};

const bmiCategory = (bmi: number): string => {
  switch (true) {
    case bmi <= 16:
      return "Underweight (Severe thinness)";
    case bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi <= 24.9:
      return "Normal range";
    case bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi <= 34.9:
      return "Obese (Class I)";
    case bmi <= 39.9:
      return "Obese (Class II)";
    default:
      return "Obese Class III (Very severely obese)";
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  return bmiCategory(bmiMetricUnits(height, weight));
};
