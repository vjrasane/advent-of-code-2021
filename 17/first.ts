import { first, inRange, last } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const area = first(input)?.substr("target area: ".length).split(", ").map(
	(axis) => last(axis.split("="))?.split("..").map(str => parseInt(str, 10))
) as [[number, number], [number, number]]
const [[x0, x1], [y0, y1]] = area;

const getHighestY = (
	velocity: [number, number],
	position: [number, number] = [0, 0]
): number => {
	const [px, py] = position;
	const [vx, vy] = velocity;
	const next: [number, number] = [px + vx, py + vy];
	if (next[1] <= py) return py;
	const xdrag = vx === 0 ? 0 : vx - (vx / Math.abs(vx));
	return getHighestY([xdrag, vy - 1], next)
}

const fireAt = (velocity: [number, number]): [boolean, [number, number]] => {
	let pos: [number, number] = [0, 0];
	let vel = velocity;
	while (pos[0] <= x1 && pos[1] >= y0) {
		if (inRange(x0, x1 + 1, pos[0]) && inRange(y0, y1 + 1, pos[1]))
			return [true, pos];
		const xdrag = vel[0] === 0 ? 0 : vel[0] - (vel[0] / Math.abs(vel[0]));
		pos = [pos[0] + vel[0], pos[1] + vel[1]];
		vel = [xdrag, vel[1] - 1]
	}
	return [false, pos];
}

let hits = [];
for (let i = 1; i <= x1; i++) {
	for (let j = y0; j < 1000; j++) {
		const [hit] = fireAt([i, j]);
		if (hit) hits.push([i, j]);
	}
}

console.log(hits.length)
