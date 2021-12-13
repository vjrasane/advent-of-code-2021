
import { toUpper, last } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const paths = input.map((line) => line.split("-"));

const getEdge = (current: string, a: string, b: string): [string, string] | [] => {
	if (a === current) return [a, b];
	if (b === current) return [b, a];
	return [];
}

const getPaths = (path: string[] = ["start"]): Array<string[]> => {
	const current = last(path) ?? "start";
	if (current === "end") return [path];
	const forks = paths
		.map(([a, b]) => getEdge(current, a, b))
		.filter(([start, end]) => {
		if (!start || !end) return false;
		if (end === toUpper(end)) return true;
		return !path.includes(end);
	}) as Array<[string, string]>;
	return forks.flatMap(
		([, end]) => getPaths([...path, end])
	)
}

console.log(getPaths().length)