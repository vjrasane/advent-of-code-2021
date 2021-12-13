



import {  partition, isEqual, uniqWith, max, times, set, get } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const [coordLines, foldLines] = partition(
	(line) => !line.startsWith("fold along"), input
)

const coordinates = coordLines.map((line) =>line.split(",").map(str => parseInt(str, 10))) as Array<[number, number]>;
const folds = foldLines.map((line) =>{
	const [axis, num] = line.split("fold along ")[1].split("=");
	return [axis, parseInt(num, 10)] as [string, number];
});

const execFold = (coords: Array<[number, number]>, fold: [string, number]): Array<[number, number]> => {
	const [ axis, num] = fold;
	const accessor = ([x, y]: [number, number]): number =>  axis === "x" ? x : y;
	const mutator = ([x, y]: [number, number], num: number): [number, number] => axis === "x" ? [num, y] : [x, num]; 
	const [greater, smaller] = partition((c) => accessor(c) > num, coords);
	return 	uniqWith(
		isEqual,
		[...smaller, ...greater.map(
			(c) => mutator(c, 2 * num - accessor(c))
		)]
		) as Array<[number, number]>
}

const result = folds.reduce((acc, curr) => execFold(acc, curr), coordinates);

const printCoords = (coords: Array<[number, number]>) => {
	const maxX =
	max(coords.map(([x]) => x)) || 0;
  const maxY =
	max(coords.map(([, y]) => y)) || 0;

  const grid = coords.reduce(
	  (acc, [x, y]) => set([y, x], 1, acc), []
  )

  console.log(times((y) => y, maxY + 1).map(
	(y) => times((x) => x, maxX + 1).map(
		(x) => get([y, x], grid) ? "#" : "."
	).join("")
).join("\n"))
}

printCoords(result)