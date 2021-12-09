import { get, sum, isEqual } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const grid: number[][] = input.map(
	(line) => line.split("").map(str => parseInt(str))
);

const getAdjacentCoordinates = (x: number, y: number): Array<[number, number]> => {
	return [
		[x, y - 1],
		[x, y + 1],
		[x - 1, y],
		[x + 1, y]
	].filter(
		([x, y]) => get([y, x], grid) !== undefined
	) as Array<[number, number]>
}	

const getAdjacents = (x: number, y: number): Array<number> => {
	return getAdjacentCoordinates(x,y).map(([x,y]) => get([y, x], grid))
}

const isLowPoint = (x: number, y: number) => {
	return getAdjacents(x,y).every(adj => adj > grid[y][x])
}

const visited: number[][] = [];
const getBasinSize = (x: number, y: number): number => {
	if (grid[y][x] === 9) return 0;
	const adj = getAdjacentCoordinates(x, y)
		.filter((coords) => !visited.some((vis) => isEqual(coords, vis)))
		.filter(coords => grid[coords[1]][coords[0]] > grid[y][x])
	if (!adj.length) return 1;
	visited.push(...adj);
	const sizes = adj.map(
		([x, y]) => getBasinSize(x, y)
	);
	return sum(sizes) + 1;
}

const basins = grid.reduce(
	(acc: Array<number>, row, y): Array<number> => {
		return [...acc, ...row.reduce(
			(acc: Array<number>, num, x): Array<number>  => {
				if (!isLowPoint(x, y)) return acc;
				return [...acc, getBasinSize(x, y)];
			}
		, [])]
	},
[])

console.log(basins.sort((a,b) => a - b).slice(-3).reduce((acc, curr) => acc * curr, 1));
