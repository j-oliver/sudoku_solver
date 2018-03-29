import React, { Component } from 'react';

import Square from './square.js';

function createEmpty2dArray(xlength, ylength) {
  return Array.apply(null, Array(xlength)).map(x =>
         Array.apply(null, Array(ylength)).map(String.prototype.valueOf, ''));
}

function getInnerArray(array, fromX, toX, fromY, toY) {
  const xLength = toX - fromX + 1;
  const yLength = toY - fromY + 1;

  const innerArray = createEmpty2dArray(xLength, yLength);

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
}


export default class SudokuGrid extends Component {
  constructor() {
    super();

    const grid = Array()

    this.state = {
      solved: false,
      grid: createEmpty2dArray(9, 9),
      numberpickerIndex: { rIndex: -1, cIndex: -1 }
    }
  }

  getInnerGrid(position) {
    switch(position) {
      case 'topLeft':     return getInnerArray(this.state.grid, 0, 2, 0, 2);
      case 'topMid':      return getInnerArray(this.state.grid, 0, 2, 3, 5);
      case 'topRight':    return getInnerArray(this.state.grid, 0, 2, 6, 8);
      case 'midLeft':     return getInnerArray(this.state.grid, 3, 5, 0, 2);
      case 'midMid':      return getInnerArray(this.state.grid, 3, 5, 3, 5);
      case 'midRight':    return getInnerArray(this.state.grid, 3, 5, 6, 8);
      case 'bottomLeft':  return getInnerArray(this.state.grid, 6, 8, 0, 2);
      case 'bottomMid':   return getInnerArray(this.state.grid, 6, 8, 3, 5);
      case 'bottomRight': return getInnerArray(this.state.grid, 6, 8, 6, 8);
      default: return undefined;
    }
  }

  setNumberPicker(rIndex, cIndex) {
    this.setState({ numberpickerIndex: { rIndex, cIndex }})
  }

  pickNumber(rIndex, cIndex, value) {
    const grid = this.state.grid.slice(0);
    grid[rIndex][cIndex] = value;

    this.setState({
      numberpickerIndex: { rIndex: -1, cIndex: -1 },
      grid
    });
  }

  getGrid() {
    return this.state.grid.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex}${cindex}`;
        const hasNumberPicker =
          this.state.numberpickerIndex.rIndex === rindex &&
          this.state.numberpickerIndex.cIndex === cindex;

        return <Square
          squarekey={key}
          value={cell}
          pickNumber={(value) => this.pickNumber(rindex, cindex, value)}
          hasNumberPicker={hasNumberPicker}
          setNumberPicker={() => this.setNumberPicker(rindex, cindex)}/>;
      });
    });
  }

  createNewSudoku() {
    // const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // const sudoku = Array(9).fill(Array(9).fill(0));
  }

  render() {
    return (
      <div className='sudokugrid'>
        {
          this.getGrid()
        }
      </div>
    );
  }
}