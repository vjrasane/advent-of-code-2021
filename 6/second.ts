import { getInputFile, readLines } from "../utils";
import { sum, take, takeRight, times } from "lodash/fp";

const input = readLines(getInputFile(__filename));
const initial: number[] = input[0]
  .split(",")
  .map((str: string) => parseInt(str, 10));

const days = [0, 0, 0, 0, 0, 0, 0, 0, 0];
initial.forEach((fish) => {
  days[fish] += 1;
});

const population = times((day) => day, 256).reduce((acc, day) => {
  console.log(day, acc);
  const [newborns, ...middle] = take(7, acc);
  const [firstWaiting, secondWaiting] = takeRight(2, acc);
  return [...middle, newborns + firstWaiting, secondWaiting, newborns];
}, days);

console.log(sum(population));
