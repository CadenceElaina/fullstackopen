import { question } from "readline-sync";

interface rawValues {
  rawTarget: string;
  rawDailyHours: string[];
}

interface parsedValues {
  parsedTarget: number;
  parsedDailyHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getInput = (): rawValues => {
  const rawTarget = question("What is your target value?");

  let day = 1;
  const rawDailyHours: string[] = [];

  while (true) {
    const input = question(
      `How many hours did you exercise on day ${day}? (Press 'enter' to quit): `
    );

    if (input) {
      rawDailyHours.push(input);
      day++;
    } else {
      break;
    }
  }

  return { rawTarget, rawDailyHours };
};

const parseInput = (
  rawTarget: string,
  rawDailyHours: string[]
): parsedValues => {
  const nums: number[] = rawDailyHours.map((n) => Number(n));
  const hasNegative: boolean = nums.some((n) => n < 0);
  const numsArrBools: boolean[] = nums.map((n) => isNaN(n));
  const rawDailyHoursHasNaN = numsArrBools.includes(true);
  const rawTargetHasNaN = isNaN(Number(rawTarget));

  if (Number(rawTarget) <= 0 && Number(rawDailyHours.length === 0)) {
    throw new Error(
      "target must be a positive number and you must provide at least one day's hours exercised!"
    );
  } else if (Number(rawTarget) <= 0) {
    throw new Error("Target must be a positive value!");
  } else if (Number(rawDailyHours.length === 0)) {
    throw new Error("Provide hours exercised for at least one day!");
  } else if (hasNegative) {
    throw new Error("You cannot exercise negative hours!");
  } else if (rawDailyHoursHasNaN) {
    throw new Error(
      "You must enter a string that is convertable to a positive number for your daily exercise hours!"
    );
  } else if (rawTargetHasNaN) {
    throw new Error(
      "Your target value must be a string that can be converted to a positive number!"
    );
  }

  return {
    parsedTarget: Number(rawTarget),
    parsedDailyHours: nums,
  };
};

const calculate = (target: number, data: number[]): Result => {
  const trainedDays = data.filter((d) => d > 0).length;
  const avg = data.reduce((acc, curr) => acc + curr) / data.length;
  const bool = avg >= target;

  const getRating = (average: number, target: number): number => {
    if (avg < 1.5) return 1;
    if (Math.ceil(avg) === 2) return 2;
    else return 3;
  };
  const getRatingDescription = (rate: number): string => {
    if (rate === 1) {
      return "Don't give up! You can do better next week!";
    }
    if (rate === 2) {
      return "You're almost to your goal, You've got this!";
    }
    if (rate === 3) {
      return "Nice work! Keep it up!";
    }
  };

  const rate = getRating(avg, target);
  const ratingDescription = getRatingDescription(rate);

  return {
    periodLength: data.length,
    trainingDays: trainedDays,
    success: bool,
    rating: rate,
    ratingDescription: ratingDescription,
    target,
    average: avg,
  };
};

try {
  const { rawTarget, rawDailyHours } = getInput();
  //console.log(rawTarget, rawDailyHours);
  const { parsedTarget, parsedDailyHours } = parseInput(
    rawTarget,
    rawDailyHours
  );
  //console.log(parsedTarget, parsedDailyHours);
  console.log(calculate(parsedTarget, parsedDailyHours));
} catch (error) {
  if (error instanceof Error) {
    console.log("error message: ", error.message);
  }
}
//console.log(calculate([3, 0, 2, 4.5, 0, 3, 1], 2));
