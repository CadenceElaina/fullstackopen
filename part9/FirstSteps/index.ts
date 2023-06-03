import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculate, parseInput } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string")
    throw new Error("Missing parameters.");

  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!validParameters || !weight || !height) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises === undefined || target === undefined)
      throw new Error("Missing parameters.");

    if (
      !(
        Array.isArray(daily_exercises) &&
        daily_exercises.length > 0 &&
        daily_exercises.every(
          (h): h is string | number =>
            typeof h === "number" || typeof h === "string"
        )
      ) ||
      (typeof target !== "number" && typeof target !== "string")
    )
      throw new Error("Malformatted parameters.");
    const { parsedTarget, parsedDailyHours } = parseInput(
      target,
      daily_exercises
    );
    res.send(calculate(parsedTarget, parsedDailyHours));
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : "Unknown error.",
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
