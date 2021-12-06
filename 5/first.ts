import { isEqual, inRange, max, min, range, sumBy } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const lines = readLines(getInputFile(__filename));

type Point = [number, number];

type Vector = [Point, Point];

const toCoords = (str: string): Point => {
  const [x, y] = str.trim().split(",");
  return [parseInt(x, 10), parseInt(y, 10)];
};

const isHorizontal = (vector: Vector): boolean => {
  const [start, end] = vector;
  if (start[1] === end[1]) return true;
  return false;
};

const isVertical = (vector: Vector): boolean => {
  const [start, end] = vector;
  if (start[0] === end[0]) return true;
  return false;
};

const isPointOnVector = (x: number, y: number, vector: Vector) => {
  const [start, end] = vector;
  if ([start[0], end[0]].includes(x) && inRange(start[1], end[1] + 1, y))
    return true;
  if ([start[1], end[1]].includes(y) && inRange(start[0], end[0] + 1, x))
    return true;
  return false;
};

const vectors: Array<Vector> = lines
  .map((line: string): [Point, Point] => {
    const [start, end] = line.split("->");
    return [toCoords(start), toCoords(end)];
  })
  .filter(
    (vector) =>
      !isEqual(vector[0], vector[1]) &&
      (isHorizontal(vector) || isVertical(vector))
  );

const maxX =
  max(vectors.map(([start, end]: Vector) => Math.max(start[0], end[0]))) || 0;
const maxY =
  max(vectors.map(([start, end]: Vector) => Math.max(start[1], end[1]))) || 0;
const minX =
  min(vectors.map(([start, end]: Vector) => Math.min(start[0], end[0]))) || 0;
const minY =
  min(vectors.map(([start, end]: Vector) => Math.min(start[1], end[1]))) || 0;

const count = sumBy((x: number): number => {
  return sumBy((y: number): number => {
    const intersecting = vectors.filter((vector: Vector) =>
      isPointOnVector(x, y, vector)
    );
    return intersecting.length >= 2 ? 1 : 0;
  }, range(minY, maxY + 1));
}, range(minX, maxX + 1));

console.log(count);
