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
    [winningBoard, winningNums, remainingBoards]: [
      number[][] | undefined,
      number[],
      Array<number[][]>
    ],
    curr,
    index
  ): [number[][] | undefined, number[], Array<number[][]>] => {
    console.log(remainingBoards.length);
    if (winningBoard) return [winningBoard, winningNums, []];
    const subset = numbers.slice(0, index + 1);
    const winners = remainingBoards.filter((board) =>
      hasBoardWon(board, subset)
    );
    if (!winners.length) return [winningBoard, winningNums, remainingBoards];
    if (remainingBoards.length <= 1) return [winners[0], subset, []];
    return [
      undefined,
      [],
      remainingBoards.filter((board) => !winners.includes(board)),
    ];
  },
  [undefined, [], boards]
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
