import { get, sum } from "lodash/fp";
import { getInputFile, getTestFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const grid = input.map(
	(line) => line.split("").map(str => parseInt(str))
);

const getAdjacents = (x: number, y: number): Array<number> => {
	return [
		get([y - 1, x], grid),
		get([y + 1, x], grid),
		get([y, x - 1], grid),
		get([y, x + 1], grid),
	].filter((num) => num !== undefined)
}

const lows = grid.reduce(
	(acc, row, y): Array<number> => [...acc, ...row.filter((num, x) => 
		getAdjacents(x, y).every((adj) => adj > num)
	)],
[])

console.log(sum(lows.map((low) => low + 1)));