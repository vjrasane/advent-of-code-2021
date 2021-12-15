import { invert, sumBy } from "lodash/fp";
import { getInputFile, getTestFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const signals = input.map((line) =>
  line.split("|").map((part) => part.trim().split(" "))
);

console.log(signals);

const easyDigitLengths = {
  1: 2,
  4: 4,
  7: 3,
  8: 7,
};

const getEasyDigitCount = (
  inputs: Array<string>,
  outputs: Array<string>
): number => {
  return outputs.filter((output) => output.length in invert(easyDigitLengths))
    .length;
};

const count = sumBy(
  ([inputs, outputs]) => getEasyDigitCount(inputs, outputs),
  signals
);

console.log(count);
