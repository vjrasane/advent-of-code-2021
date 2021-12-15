import fs from "fs";

const depths = fs
  .readFileSync("./1/first.input", "utf-8")
  .split("\r\n")
  .map((str) => parseInt(str, 10));

const increases = depths.reduce((acc, curr, index) => {
  if (index === 0) return acc;
  const prev = depths[index - 1];
  if (curr > prev) return acc + 1;
  return acc;
}, 0);

console.log(increases);
