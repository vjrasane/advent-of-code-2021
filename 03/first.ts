import { getInputFile, readLines } from "../utils";
import { times } from "lodash/fp";

const input = readLines(getInputFile(__filename));
const length = input[0].length;

const numbers = input.map((reading: string) =>
  reading.split("").map((bit: string) => parseInt(bit, 10))
);

const counts = numbers.reduce(
  (acc, curr) =>
    acc.map(
      (count: number, index: number) => count + (curr[index] === 1 ? 1 : -1)
    ),
  times(() => 0, length)
);

const gamma = parseInt(
  counts.map((bit: number) => (bit >= 0 ? 1 : 0)).join(""),
  2
);

const epsilon = parseInt(
  counts.map((bit: number) => (bit >= 0 ? 0 : 1)).join(""),
  2
);

console.log(gamma, epsilon, gamma * epsilon);
