import { get, range, set, times } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const grid = input.map(line => line.split("").map(str => parseInt(str, 10)));

const getAdjacentCoordinates = (x: number, y: number): Array<[number, number]> => {
	return range(-1, 2).flatMap(
		(hor) => range(-1, 2).map(
			(ver) => [x + hor, y + ver] as [number, number]
		)
	).filter(
		([x, y]) => get([y, x], grid) !== undefined
	);
}	

const incrementCell = (x: number, y: number, grid: number[][]): [number, number[][]] => {
	const cell = get([y, x], grid);
	const inc = set([y, x], cell + 1, grid);
	if (cell !== 9) return [0, inc];
	return getAdjacentCoordinates(x, y).reduce(
		([flashes, grid], [x, y]): [number, number[][]] => {
			const [adjFlashes, adjGrid] = incrementCell(x, y, grid);
			return [flashes  + adjFlashes, adjGrid]
		}, [1, inc]
	)
}

const normalizeGrid = (grid: number[][]): number[][] => grid.map(row => row.map(
	cell => cell > 9 ? 0 : cell
))

const execStep = (grid: number[][]): [number, number[][]] => {
	return grid.reduce(([flashes, grid], row, y): [number, number[][]]=> {
		return row.reduce(([flashes, grid], cell, x): [number, number[][]] => {
		   const [cellFlashes, cellGrid] = incrementCell(x, y, grid);
		   return [flashes + cellFlashes, cellGrid];
	   }, [flashes, grid])
   }, [0, grid]);
}

const [flashes, end] = times(step => step, 100).reduce(
	([flashes, grid]): [number, number[][]] => {
		const [stepFlashes, stepGrid] = execStep(grid);
		return [flashes + stepFlashes, normalizeGrid(stepGrid)];
	}, [0, grid] 
)

console.log(flashes);