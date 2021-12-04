import fs from "fs";
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
