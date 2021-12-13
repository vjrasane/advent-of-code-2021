
import {  toUpper, last, countBy, identity, values } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const paths = input.map((line) => line.split("-"));

const getEdge = (current: string, a: string, b: string): [string, string] | [] => {
	if (a === current) return [a, b];
	if (b === current) return [b, a];
	return [];
}

const isUpper = (str: string) => str === toUpper(str)

const isValidEdge = (path: string[], start?: string, end?: string) => {
	if (!start || !end) return false;
	if (end === "start") return false;
	if (isUpper(end)) return true;
	if(!path.includes(end)) return true;
	return values(
		countBy(
			identity,
			path.filter((cave) => !isUpper(cave))
		)
		).every((vis) => vis < 2)
}

const getPaths = (path: string[] = ["start"]): Array<string[]> => {
	const current = last(path) ?? "start";
	if (current === "end") return [path];
	const forks = paths
		.map(([a, b]) => getEdge(current, a, b))
		.filter(([start, end]) => {
			return isValidEdge(path, start, end);
	}) as Array<[string, string]>;
	return forks.flatMap(
		([, end]) => getPaths([...path, end])
	)
}

console.log(getPaths().length)