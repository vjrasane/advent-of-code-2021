import { get, range, set } from "lodash/fp";
import {  getInputFile, readLines } from "../utils";

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

const incrementCell = (x: number, y: number, grid: number[][]): number[][] => {
	const cell = get([y, x], grid);
	const inc = set([y, x], cell + 1, grid);
	if (cell !== 9) return inc;
	return getAdjacentCoordinates(x, y).reduce(
		(grid, [x, y]): number[][] => {
			return incrementCell(x, y, grid);
		}, inc
	)
}

const normalizeGrid = (grid: number[][]): number[][] => grid.map(row => row.map(
	cell => cell > 9 ? 0 : cell
))

const execStep = (grid: number[][]): number[][] => {
	return grid.reduce((grid, row, y): number[][] => {
		return row.reduce((grid, cell, x): number[][] => {
		   return incrementCell(x, y, grid);
	   }, grid)
   }, grid);
}

const isSimul = (grid: number[][]): boolean => {
	return grid.every((row) => row.every(cell => cell > 9));
}

const findSimul = (grid: number[][], step = 0): number => {
	if (isSimul(grid)) return step;
	const stepGrid = execStep(normalizeGrid(grid));
	return findSimul(stepGrid, step + 1);
}

console.log(findSimul(grid));