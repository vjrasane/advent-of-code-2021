import { invert, sumBy } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const signals = input.map((line) =>
  line.split("|").map((part) => part.trim().split(" "))
);

const easyDigitLengths = invert({
  1: 2,
  4: 4,
  7: 3,
  8: 7,
});

const digitMatches = (first: string, second: string): boolean =>
  first.split("").every((one) => second.includes(one));

const countDigitMatches = (first: string, second: string): number =>
  first.split("").filter((one) => second.includes(one)).length;

const inferDigit = (d: string, digits: Record<string, string>): number => {
  switch (d.length) {
    case 2:
    case 4:
    case 3:
    case 7:
      return parseInt(easyDigitLengths[d.length]);
    case 5:
      if (digitMatches(digits["1"], d)) return 3;
      return countDigitMatches(digits["4"], d) === 3 ? 5 : 2;
    case 6:
      if (digitMatches(digits["4"], d)) return 9;
      if (digitMatches(digits["1"], d)) return 0;
      return 6;
  }
  return 0;
};

const getOutputValue = (
  inputs: Array<string>,
  outputs: Array<string>
): number => {
  const digits = inputs
    .filter((output) => output.length in easyDigitLengths)
    .reduce((acc, curr) => {
      const key = easyDigitLengths[curr.length];
      return { ...acc, [key]: curr };
    }, {});

  return parseInt(outputs.map((i) => inferDigit(i, digits)).join(""));
};

const count = sumBy(
  ([inputs, outputs]) => getOutputValue(inputs, outputs),
  signals
);

console.log(count);
