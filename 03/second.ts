import { getFile, getInputFile, readLines } from "../utils";
import { times } from "lodash/fp";

const input = readLines(getInputFile(__filename));
const length = input[0].length;

const numbers = input.map((reading: string) =>
  reading.split("").map((bit: string) => parseInt(bit, 10))
);

const getBitCount = (numbers: Array<number[]>, index: number) =>
  numbers.reduce((acc, curr) => acc + (curr[index] === 1 ? 1 : -1), 0);

const oxygen = parseInt(
  times(() => 0, length)
    .reduce((acc, curr, index) => {
      if (acc.length <= 1) return acc;
      const bit = getBitCount(acc, index) >= 0 ? 1 : 0;
      return acc.filter((bits) => bits[index] === bit);
    }, numbers)[0]
    .join(""),
  2
);

const carbon = parseInt(
  times(() => 0, length)
    .reduce((acc, curr, index) => {
      if (acc.length <= 1) return acc;
      const bit = getBitCount(acc, index) >= 0 ? 0 : 1;
      return acc.filter((bits) => bits[index] === bit);
    }, numbers)[0]
    .join(""),
  2
);

console.log(oxygen, carbon, oxygen * carbon);
