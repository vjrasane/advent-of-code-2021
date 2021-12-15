import { set, get } from "lodash";
import { isEqual, flatten } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const lines = readLines(getInputFile(__filename));

type Point = [number, number];

type Vector = [Point, Point];

const toCoords = (str: string): Point => {
  const [x, y] = str.trim().split(",");
  return [parseInt(x, 10), parseInt(y, 10)];
};

const subtractPoints = (first: Point, second: Point): Point => {
  return [first[0] - second[0], first[1] - second[1]];
};

const addPoints = (first: Point, second: Point): Point => {
  return [first[0] + second[0], first[1] + second[1]];
};

const asDirection = (point: Point): Point => {
  const [x, y] = point;
  return [x && x / Math.abs(x), y && y / Math.abs(y)];
};

const getVectorPoints = (vec: Vector): Array<Point> => {
  const [start, end] = vec;
  const dir = asDirection(subtractPoints(end, start));
  let next = start;
  const points = [];
  while (!isEqual(next, end)) {
    points.push(next);
    next = addPoints(next, dir);
  }
  points.push(end);

  return points;
};

const vectors: Array<Vector> = lines.map((line: string): [Point, Point] => {
  const [start, end] = line.split("->");
  return [toCoords(start), toCoords(end)];
});

const intersections: number[][] = [];
vectors.map(getVectorPoints).forEach((points) => {
  points.forEach((point) => {
    const [x, y] = point;
    const value = get(intersections, [x, y]);
    set(intersections, [x, y], (value || 0) + 1);
  });
});

console.log(flatten(intersections).filter((val) => val >= 2).length);
