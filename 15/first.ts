
import { get, isEqual, minBy, set, inRange } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const grid: number[][] = input.map((line) => line.split("").map(str => parseInt(str, 10)));

const height = grid.length;
const width = grid[0].length;

const getAdjacentCoordinates = (x: number, y: number): Array<[number, number]> => {
	return [
		[x, y - 1],
		[x, y + 1],
		[x - 1, y],
		[x + 1, y]
	].filter(
		([x, y]) => inRange(0, width, x) && inRange(0, height, y)
	) as Array<[number, number]>
}	

type Coordinates = [number, number] 

const search = (): number => {
	let risks: number[][] = [[0]];
	let paths: Array<[Coordinates, number]> = [[[0,0], 0]];
	while(paths.length) {
		const minPath = minBy(([, pathRisk]) => pathRisk, paths) as [Coordinates, number];
		paths = paths.filter((path) => path !== minPath);
		// const [coordinates, currentRisk] = paths.pop() as [Coordinates, number];
		const [coordinates, currentRisk] = minPath;
		const adjacents = getAdjacentCoordinates(coordinates[0], coordinates[1]);

		for (let [x, y] of adjacents) {
			const totalRisk = currentRisk + grid[y][x];
			const knownRisk = get([y, x], risks);
			if (knownRisk < totalRisk) continue;
			risks = set([y, x], totalRisk, risks);
			paths = paths.filter(([coords]) => !isEqual(coords, [x, y]));
			if (x === width - 1 && y === height - 1) continue;
			paths.push([[x, y], totalRisk]);
		}
	}
	return get([height - 1, width - 1], risks);
} 

console.log(search());