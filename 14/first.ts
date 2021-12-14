
import { identity, countBy, min, max, first, tail, times, isEqual, values } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const template = first(input)?.split("") || [];

const rules = tail(input).map((line) => {
	const [pair, result] = line.split(" -> ");
	const [a, b] = pair.split("");
	return [[a, b], result] as const;
});

const applyRules = (polymer: string[]) => {
	return polymer.reduce(
		(acc: string[], curr, index): string[] => {
			if (index === polymer.length - 1) return [...acc, curr];
			const pair = [curr, polymer[index + 1]] as const;
			const [, result] = rules.find(([rulePair]) => isEqual(rulePair, pair)) ?? [];
			if (!result) return [...acc, curr];
			return [...acc, curr, result];
		}, []
		)
}

const end = times(identity, 40).reduce(
	(acc, curr) => {console.log("STEP", curr); return applyRules(acc); }, template
)
const counts = values(countBy(identity, end));
console.log(max(counts) as number - (min(counts) as number))