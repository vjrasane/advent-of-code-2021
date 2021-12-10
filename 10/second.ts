import { getInputFile, readLines } from "../utils";

const points = {
	")" : 1,
	"]" : 2,
	"}": 3,
	">": 4
} as const;

const pairs = {
	"(" : ")",
	"[" : "]",
	"{" : "}",
	"<" : ">"
} as const;

const input = readLines(getInputFile(__filename));

const getMissingCharacters = (line: Array<string>): Array<string> => {
	const [stack] = line.reduce(
		(
		[stack, illegal]: [Array<string>, string | undefined] 
		, curr
		): [Array<string>, string | undefined] => { 
		if (illegal) return [[], illegal];
		if (curr in pairs) return [[pairs[curr as keyof typeof pairs], ...stack], undefined];
		const [closing, ...rest] = stack;
		if (curr !== closing) return [[], curr];
		return [rest, undefined]
	}, [[], undefined])
	return stack;
};

const illegals = input
	.map(line =>  line.split(""))
	.map(getMissingCharacters)
	.filter(chars => !!chars.length)
	.map(
		(chars) => chars.reduce
		((acc, curr) => acc * 5 + points[curr as keyof typeof points], 0)
	);

illegals.sort((a, b) => a - b)

console.log(illegals[Math.floor(illegals.length / 2)])
