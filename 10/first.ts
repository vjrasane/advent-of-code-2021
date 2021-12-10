import { invert, sum } from "lodash/fp";
import { getInputFile, getTestFile, readLines } from "../utils";

const points = {
	")" : 3,
	"]" : 57,
	"}": 1197,
	">": 25137
} as const;

const pairs = {
	"(" : ")",
	"[" : "]",
	"{" : "}",
	"<" : ">"
} as const;

const input = readLines(getInputFile(__filename));

const illegals = input.map(
	(line) => {
		const chars = line.split("");
		const [illegal] = chars.reduce(
			([illegal, stack]: [string | undefined, Array<string>]
				, curr): [string | undefined, Array<string>] => {
				if (illegal) return [illegal, []];
				if (curr in pairs) return [undefined, [curr, ...stack]];
				const [opening, ...rest] = stack;
				if (invert(pairs)[curr] !== opening) return [curr, []];
				return [undefined, rest];
		}, [undefined, []]);
		return illegal;
	}
).filter(Boolean).map(
	(illegal) => points[illegal as keyof typeof points] 
);

console.log(sum(illegals))
