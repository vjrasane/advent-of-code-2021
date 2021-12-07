import { getInputFile, readLines } from "../utils";
import { max, min, minBy, range, sumBy } from "lodash/fp";

const input = readLines(getInputFile(__filename));

const crabs = input[0].split(",").map((str) => parseInt(str, 10));

const [minHorizontal, maxHorizontal] = [min(crabs) ?? NaN, max(crabs) ?? NaN];

const position =
  minBy((pos: number) => {
    return sumBy((crab) => Math.abs(pos - crab), crabs);
  }, range(minHorizontal, maxHorizontal)) ?? NaN;

console.log(
  position,
  sumBy((crab) => Math.abs(position - crab), crabs)
);
