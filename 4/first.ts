import { chunk, last, sum, sumBy } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const [first, ...rest] = readLines(getInputFile(__filename));

const numbers = first.split(",").map((str) => parseInt(str, 10));
const boards = chunk(
  5,
  rest.map((row) => row.split(/\s+/).map((str) => parseInt(str, 10)))
);

const hasBoardWon = (board: number[][], numbers: number[]): boolean =>
  board.some((row) => row.every((num) => numbers.includes(num))) ||
  board[0].some((col, index) =>
    board.map((row) => row[index]).every((num) => numbers.includes(num))
  );

const [winningBoard, winningNums] = numbers.reduce(
  (
    [winningBoard, winningNums]: [number[][] | undefined, number[]],
    curr,
    index
  ): [number[][] | undefined, number[]] => {
    if (winningBoard) return [winningBoard, winningNums];
    const subset = numbers.slice(0, index + 1);
    const winner = boards.find((board) => hasBoardWon(board, subset));
    return [winner, subset];
  },
  [undefined, []]
);

const unmarked = sumBy(
  (row) => sum(row.filter((num) => !winningNums.includes(num))),
  winningBoard
);

console.log(
  winningBoard,
  winningNums,
  unmarked,
  unmarked * (last(winningNums) || 0)
);
