import { getFile, getInputFile, readLines } from "../utils";
import { times } from "lodash/fp";

const input = readLines(getInputFile(__filename));

const initial: number[] = input[0]
  .split(",")
  .map((str: string) => parseInt(str, 10));

const population = times((day) => day, 80).reduce((acc) => {
  const newborns = acc.filter((fish) => fish === 0).length;
  return [
    ...acc.map((fish) => (fish === 0 ? 6 : fish - 1)),
    ...times(() => 8, newborns),
  ];
}, initial);

console.log(population.length);
