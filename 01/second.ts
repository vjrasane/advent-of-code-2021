import fs from "fs";
import { sum } from "lodash/fp";

const depths = fs
  .readFileSync("./1/first.input", "utf-8")
  .split("\r\n")
  .map((str) => parseInt(str, 10));

const increases = depths.reduce((acc, curr, index) => {
  if (index === 0) return acc;
  const window = depths.slice(index, index + 3);
  const prev = depths.slice(index - 1, index + 2);
  if (window.length !== 3) return acc;
  if (prev.length !== 3) return acc;
  return sum(prev) < sum(window) ? acc + 1 : acc;
}, 0);

console.log(increases);
