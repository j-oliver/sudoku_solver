type Sudoku = number[][];

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function slice2DArray<T>(
  arr: T[][],
  fromX: number,
  toX: number,
  fromY: number,
  toY: number,
): T[][] {
  // Check if indices are within bounds
  if (fromX < 0 || fromX >= arr.length || toX < 0 || toX >= arr.length) {
    throw new Error('X indices are out of bounds');
  }

  if (fromY < 0 || fromY >= arr[0].length || toY < 0 || toY >= arr[0].length) {
    throw new Error('Y indices are out of bounds');
  }

  // Slice the 2D array based on the specified indices
  const slicedArray: T[][] = arr
    .slice(fromX, toX + 1)
    .map(row => row.slice(fromY, toY + 1));

  return slicedArray;
}

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

function getGridFor(
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
function getValidNumbersForCell(
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

function prefill(sudoku: Sudoku): Sudoku {
  const sudokuCopy = sudoku.slice(0);

  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku.length; j++) {
      if (sudokuCopy[i][j] === 0) {
        const validNumbers = getValidNumbersForCell(i, j, sudokuCopy);
        if (validNumbers.length === 1) {
          sudokuCopy[i][j] = validNumbers[0];
        }
      }
    }
  }

  return sudokuCopy;
}

async function solveSudoku(sudoku: Sudoku): Promise<Sudoku> {
  const sudokuCopy = prefill(sudoku);

  let iterations = 0;

  const result = await solve();
  if (result) {
    console.log(iterations);
    return sudokuCopy;
  }
  throw 'no solution';

  // extremely slow algorithm to solve sudokus. I believe it's O(n!) so it's terrible. Looks good as code though
  async function solve(): Promise<boolean> {
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku.length; j++) {
        if (sudokuCopy[i][j] === 0) {
          const validNumbers = shuffle(
            getValidNumbersForCell(i, j, sudokuCopy),
          );

          for (let m = 0; m < validNumbers.length; m++) {
            sudokuCopy[i][j] = validNumbers[m];
            iterations++;
            if ((await solve()) !== false) {
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

self.addEventListener('message', async event => {
  const { sudoku } = event.data;
  try {
    const solvedSudoku = await solveSudoku(sudoku);
    self.postMessage({ solvedSudoku });
  } catch (error) {
    self.postMessage({ error });
  }
});
