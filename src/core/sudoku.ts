import { Difficulty, Sudoku } from '../types';
import { slice2DArray } from '../utils';

const size = 9;

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function createEmpty2dArray(
  xlength: number,
  ylength: number,
  fill: number
): number[][] {
  return new Array(xlength).fill(0).map(() => new Array(ylength).fill(fill));
}

const difficultySettings = {
  easy: 40,
  medium: 35,
  hard: 30,
  extreme: 25,
};

export function getSudokuGrids(sudoku: Sudoku): number[][][] {
  const gridLength = Math.sqrt(size);

  if (gridLength % 1 !== 0) {
    throw new Error('Grid length is not a square number');
  }

  const grids: number[][][] = [];

  for (let i = 0; i < size; i += gridLength) {
    for (let j = 0; j < size; j += gridLength) {
      grids.push(
        slice2DArray(sudoku, i, i + (gridLength - 1), j, j + (gridLength - 1))
      );
    }
  }

  return grids;
}

function getInnerGrid(position: string, g: Sudoku) {
  switch (position) {
    case 'topLeft':
      return slice2DArray(g, 0, 2, 0, 2);
    case 'topMid':
      return slice2DArray(g, 0, 2, 3, 5);
    case 'topRight':
      return slice2DArray(g, 0, 2, 6, 8);
    case 'midLeft':
      return slice2DArray(g, 3, 5, 0, 2);
    case 'midMid':
      return slice2DArray(g, 3, 5, 3, 5);
    case 'midRight':
      return slice2DArray(g, 3, 5, 6, 8);
    case 'bottomLeft':
      return slice2DArray(g, 6, 8, 0, 2);
    case 'bottomMid':
      return slice2DArray(g, 6, 8, 3, 5);
    case 'bottomRight':
      return slice2DArray(g, 6, 8, 6, 8);
    default:
      throw 'invalid position';
  }
}

function getGridForCell(rindex: number, cindex: number) {
  let grid = '';

  if (0 <= rindex && rindex <= 2) grid += 'top';
  if (3 <= rindex && rindex <= 5) grid += 'mid';
  if (6 <= rindex && rindex <= 8) grid += 'bottom';

  if (0 <= cindex && cindex <= 2) grid += 'Left';
  if (3 <= cindex && cindex <= 5) grid += 'Mid';
  if (6 <= cindex && cindex <= 8) grid += 'Right';

  return grid;
}

function getInnerGridNumbers(
  rindex: number,
  cindex: number,
  grid: Sudoku
): number[][] {
  const gridPosition = getGridForCell(rindex, cindex);
  const innerGrid = getInnerGrid(gridPosition, grid);

  return innerGrid;
}

function getRowNumbers(rindex: number, grid: Sudoku): number[] {
  return grid[rindex];
}

function getColNumbers(cindex: number, grid: Sudoku): number[] {
  const col = [];

  for (let i = 0; i < size; i++) {
    if (grid[i][cindex] !== 0) {
      col.push(grid[i][cindex]);
    } else {
      col.push(0);
    }
  }

  return col;
}

export function getValidNumbersForCell(
  rindex: number,
  cindex: number,
  grid: Sudoku
) {
  let validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const rowNumbers = getRowNumbers(rindex, grid);
  const colNumbers = getColNumbers(cindex, grid);
  const innerGridNumbers = getInnerGridNumbers(rindex, cindex, grid);

  validNumbers = validNumbers.filter(n => !rowNumbers.includes(n));
  validNumbers = validNumbers.filter(n => !colNumbers.includes(n));
  validNumbers = validNumbers.filter(n => !innerGridNumbers.flat().includes(n));

  return validNumbers;
}

function getReadableSudoku(sudoku: Sudoku) {
  return sudoku.map(row => row.map(cell => cell || 0));
}

export function createNewSudoku(size: number, difficulty: Difficulty): Sudoku {
  const totalCells = size * size;
  const numberAmount = totalCells - difficultySettings[difficulty];
  const sudoku = solveSudoku(createEmpty2dArray(size, size, 0));

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
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return {
      rindex: indices[Math.floor(Math.random() * size)],
      cindex: indices[Math.floor(Math.random() * size)],
    };
  }
}

// function sudokuSolvable(grid: Sudoku): boolean {
//   let gridCopy = grid.slice(0);
//   gridCopy = fillTrivialSolutions(gridCopy);

//   return solveSudoku(gridCopy) !== false;
// }

// function fillTrivialSolutions(grid: Sudoku) {
//   const gridCopy = grid.slice(0);

//   for (let i = 0; i < size; i++) {
//     for (let j = 0; j < size; j++) {
//       const cell = gridCopy[i][j];
//       if (cell === 0) {
//         const validNumbers = getValidNumbersForCell(i, j, gridCopy);

//         if (validNumbers.length === 1) {
//           gridCopy[i][j] = validNumbers[0];
//         }
//       }
//     }
//   }

//   return gridCopy;
// }

export function solveSudoku(sudoku: Sudoku): Sudoku {
  const sudokuCopy = sudoku.slice(0);

  let iterations = 0;

  if (solve()) {
    console.log(iterations);
    return sudokuCopy;
  } else {
    throw 'no solution';
  }

  function solve(): boolean {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (sudokuCopy[i][j] === 0) {
          const validNumbers = getValidNumbersForCell(i, j, sudokuCopy);

          for (let m = 0; m < validNumbers.length; m++) {
            sudokuCopy[i][j] = validNumbers[m];
            iterations++;
            if (solve() !== false) {
              return true;
            }
            sudokuCopy[i][j] = 0;
          }

          return false;
        }
      }
    }
    return true;
  }
}
