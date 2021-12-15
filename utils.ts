import fs from "fs";
import { max, padChars, padCharsStart } from "lodash/fp";
import { basename, dirname, join } from "path";

export const readLines = (path: string) =>
  fs
    .readFileSync(path, "utf-8")
    .replace("\r\n", "\n")
    .split("\n")
    .map((str) => str.trim())
    .filter((str) => str.length);

export const getFile = (dir: string, file: string) => join(dir, file);

export const getInputFile = (file: string) =>
  getFile(dirname(file), basename(file, ".ts") + ".input");

export const getTestFile = (file: string) =>
  getFile(dirname(file), "test.input");

export const printGrid = <T>(grid: T[][], delimiter = "") => {
  const padding = max(grid.map(row => max(row.map(cell => `${cell}`.length)) ?? 0)) ?? 0
  console.log(
    grid.map(
      row => row.map(cell => padCharsStart(" ", padding, `${cell}`)).join(delimiter)
    ).join("\n")
  )
}