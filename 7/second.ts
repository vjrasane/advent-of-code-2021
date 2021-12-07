import { getInputFile, readLines } from "../utils";
import { max, min, minBy, range, sumBy } from "lodash/fp";

const input = readLines(getInputFile(__filename));

const crabs = input[0].split(",").map((str) => parseInt(str, 10));

const [minHorizontal, maxHorizontal] = [min(crabs) ?? NaN, max(crabs) ?? NaN];

const getCrabCost = (pos: number, crab: number) => {
  const distance = Math.abs(pos - crab);
  return (distance * (distance + 1)) / 2;
};

const position =
  minBy((pos: number) => {
    return sumBy((crab) => getCrabCost(pos, crab), crabs);
  }, range(minHorizontal, maxHorizontal)) ?? NaN;

console.log(
  position,
  sumBy((crab) => getCrabCost(position, crab), crabs)
);
