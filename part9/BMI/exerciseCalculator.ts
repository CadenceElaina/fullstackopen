interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculate = (data: number[], target: number): Result => {
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

console.log(calculate([3, 0, 2, 4.5, 0, 3, 1], 2));
