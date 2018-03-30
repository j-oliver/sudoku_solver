const size = 9;
// const grid = createEmpty2dArray(size, size);

const sudoku = {
  createEmpty2dArray: (xlength, ylength, fill='') => {
    return Array.apply(null, Array(xlength)).map(x =>
           Array.apply(null, Array(ylength)).map(x => fill));
  },


  getInnerArray: (array, fromX, toX, fromY, toY) => {
    const xLength = toX - fromX + 1;
    const yLength = toY - fromY + 1;

    const innerArray = sudoku.createEmpty2dArray(xLength, yLength);

    let innerArray_i = 0;
    for(let i = fromX; i <= toX; i++) {
      let innerArray_j = 0;
      for(let j = fromY; j <= toY; j++) {
        innerArray[innerArray_i][innerArray_j] = array[i][j];
        innerArray_j++;
      }
      innerArray_i++;
    }

    return innerArray;
  },


  getInnerGrid: (position, grid=sudoku.grid) => {
    switch(position) {
      case 'topLeft':     return sudoku.getInnerArray(grid, 0, 2, 0, 2);
      case 'topMid':      return sudoku.getInnerArray(grid, 0, 2, 3, 5);
      case 'topRight':    return sudoku.getInnerArray(grid, 0, 2, 6, 8);
      case 'midLeft':     return sudoku.getInnerArray(grid, 3, 5, 0, 2);
      case 'midMid':      return sudoku.getInnerArray(grid, 3, 5, 3, 5);
      case 'midRight':    return sudoku.getInnerArray(grid, 3, 5, 6, 8);
      case 'bottomLeft':  return sudoku.getInnerArray(grid, 6, 8, 0, 2);
      case 'bottomMid':   return sudoku.getInnerArray(grid, 6, 8, 3, 5);
      case 'bottomRight': return sudoku.getInnerArray(grid, 6, 8, 6, 8);
      default: return undefined;
    }
  },


  getGridForCell(rindex, cindex) {
    let grid = '';

    if (0 <= rindex && rindex <= 2) grid += 'top';
    if (3 <= rindex && rindex <= 5) grid += 'mid';
    if (6 <= rindex && rindex <= 8) grid += 'bottom';

    if (0 <= cindex && cindex <= 2) grid += 'Left';
    if (3 <= cindex && cindex <= 5) grid += 'Mid';
    if (6 <= cindex && cindex <= 8) grid += 'Right';

    return grid;
  },


  getInnerGridNumbers: (rindex, cindex, grid=sudoku.grid) => {
    const gridPosition = sudoku.getGridForCell(rindex, cindex);
    const innerGrid = sudoku.getInnerGrid(gridPosition, grid);

    return [].concat.apply([], innerGrid);
  },

  getRowNumbers: (rindex, grid=sudoku.grid) => {
    return grid[rindex];
  },

  getColNumbers: (cindex, grid=sudoku.grid) => {
    const col = [];

    for(let i = 0; i < size; i++) {
      if (grid[i] !== '' || grid[i] !== 0) {
        col.push(grid[i][cindex]);
      } else {
        col.push(0);
      }
    }

    return col;
  },

  getValidNumbersForCell: (rindex, cindex, grid=sudoku.grid) => {
    let validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const rowNumbers = sudoku.getRowNumbers(rindex, grid);
    const colNumbers = sudoku.getColNumbers(cindex, grid);
    const innerGridNumbers = sudoku.getInnerGridNumbers(rindex, cindex, grid);

    validNumbers = validNumbers.filter(n => !rowNumbers.includes(n));
    validNumbers = validNumbers.filter(n => !colNumbers.includes(n));
    validNumbers = validNumbers.filter(n => !innerGridNumbers.includes(n));

    return validNumbers;
  },

  isXAllowedForCell: (num, rindex, cindex, grid=sudoku.grid) => {
    const validNumbers = sudoku.getValidNumbersForCell(rindex, cindex, grid);

    return validNumbers.includes(num);
  },

  createSudoku(grid) {
    const availableNumbers = [1,2,3,4,5,6,7,8,9];
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        if (grid[i][j] === 0) {
          const validNumbers = sudoku.getValidNumbersForCell(i, j, grid);

          for(let m = 0; m < validNumbers.length; m++) {
            const randomNumber = validNumbers[Math.floor(Math.random() * validNumbers.length)];
            grid[i][j] = randomNumber;
            if (sudoku.createSudoku(grid) !== false) {
              return grid;
            }
            grid[i][j] = 0;
          }

          return false;
        }
      }
    }
  }
}

sudoku.grid = sudoku.createEmpty2dArray(size, size);

export default sudoku;