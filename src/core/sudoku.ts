import { Difficulty, Size, Sudoku } from '../types';
import { createEmpty2dArray, shuffle, slice2DArray } from '../utils';

const difficultySettings: Record<Size, Record<Difficulty, number>> = {
  2: { easy: 9, medium: 7, hard: 5, extreme: 3 },
  3: { easy: 40, medium: 35, hard: 30, extreme: 25 },
  4: { easy: 100, medium: 90, hard: 80, extreme: 70 },
};

function getSudokuGrids(sudoku: Sudoku): number[][][] {
  const gridLength = Math.sqrt(sudoku.length);
  const grids: number[][][] = [];

  for (let i = 0; i < sudoku.length; i += gridLength) {
    for (let j = 0; j < sudoku.length; j += gridLength) {
      grids.push(
        slice2DArray(sudoku, i, i + (gridLength - 1), j, j + (gridLength - 1)),
      );
    }
  }

  return grids;
}

export function getGridFor(
  sudoku: Sudoku,
  rindex: number,
  cindex: number,
): number[][] {
  const gridLength = Math.sqrt(sudoku.length);
  const grids = getSudokuGrids(sudoku);
  const gridIndex =
    Math.floor(rindex / gridLength) * gridLength +
    Math.floor(cindex / gridLength);

  return grids[gridIndex];
}

export function getValidNumbersForCell(
  rindex: number,
  cindex: number,
  sudoku: Sudoku,
) {
  const rowNumbers = sudoku[rindex];
  const colNumbers = sudoku.map(row => row[cindex]);
  const innerGridNumbers = getGridFor(sudoku, rindex, cindex).flat();

  const validNumbers = new Array(sudoku.length).fill(0).map((_, i) => i + 1);

  return validNumbers
    .filter(n => !rowNumbers.includes(n))
    .filter(n => !colNumbers.includes(n))
    .filter(n => !innerGridNumbers.flat().includes(n));
}

function getReadableSudoku(sudoku: Sudoku) {
  return sudoku.map(row => row.map(cell => cell || 0));
}

export async function createNewSudoku(
  size: Size,
  difficulty: Difficulty,
): Promise<Sudoku> {
  const dimensions = size * size;
  const totalCells = dimensions * dimensions;
  const numberAmount = totalCells - difficultySettings[size][difficulty];
  const sudoku = await solveSudoku(
    createEmpty2dArray(dimensions, dimensions, 0),
  );

  for (let i = 0; i < numberAmount; i++) {
    const { rindex, cindex } = getRandomCellAndNumber();

    if (sudoku[rindex][cindex] !== 0) {
      sudoku[rindex][cindex] = 0;
    } else {
      i--;
    }
  }

  return getReadableSudoku(sudoku);

  function getRandomCellAndNumber() {
    const indices = new Array(dimensions).fill(0).map((_, i) => i);
    return {
      rindex: indices[Math.floor(Math.random() * dimensions)],
      cindex: indices[Math.floor(Math.random() * dimensions)],
    };
  }
}

export function sudokuIsValid(sudoku: Sudoku): boolean {
  const dimensions = sudoku.length;
  const grids = getSudokuGrids(sudoku);

  for (let i = 0; i < dimensions; i++) {
    const rowNumbers = sudoku[i];
    const colNumbers = sudoku.map(row => row[i]);
    const gridNumbers = grids[i].flat();

    const validNumbers = new Array(dimensions).fill(0).map((_, i) => i + 1);

    if (
      !validNumbers.every(n => rowNumbers.includes(n)) ||
      !validNumbers.every(n => colNumbers.includes(n)) ||
      !validNumbers.every(n => gridNumbers.includes(n))
    ) {
      return false;
    }
  }

  return true;
}

export async function solveSudoku(sudoku: Sudoku): Promise<Sudoku> {
  const sudokuCopy = sudoku.slice(0);

  let iterations = 0;

  if (solve()) {
    console.log(iterations);
    return Promise.resolve(sudokuCopy);
  }

  return Promise.reject('no solution');

  // extremely slow algorithm to solve sudokus. I believe it's O(n!) so it's terrible. Looks good as code though
  function solve(): boolean {
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku.length; j++) {
        if (sudokuCopy[i][j] === 0) {
          const validNumbers = shuffle(
            getValidNumbersForCell(i, j, sudokuCopy),
          );

          for (let m = 0; m < validNumbers.length; m++) {
            sudokuCopy[i][j] = validNumbers[m];
            iterations++;
            if (solve() !== false) {
              return true;
            }
            // setting this to 0 allows us to backtrack in the recursion
            sudokuCopy[i][j] = 0;
          }

          return false;
        }
      }
    }
    return true;
  }
}
