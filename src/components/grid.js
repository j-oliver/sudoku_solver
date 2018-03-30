import React, { Component } from 'react';

import Square from './square.js';
import sudoku from '../sudoku/sudoku.js';

export default class SudokuGrid extends Component {
  constructor() {
    super();

    this.state = {
      solved: false,
      numberpickerIndex: { rIndex: -1, cIndex: -1 }
    }
  }


  setNumberPicker(rIndex, cIndex) {
    this.setState({ numberpickerIndex: { rIndex, cIndex }})
  }

  pickNumber(rIndex, cIndex, value) {
    const grid = this.props.grid.slice(0);
    grid[rIndex][cIndex] = value;

    this.setState({
      numberpickerIndex: { rIndex: -1, cIndex: -1 },
    });
  }

  getGrid() {
    const grid = this.props.grid;
    return grid.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex}${cindex}`;
        const hasNumberPicker =
          this.state.numberpickerIndex.rIndex === rindex &&
          this.state.numberpickerIndex.cIndex === cindex;
        const availableNumbers = sudoku.getValidNumbersForCell(rindex, cindex, grid);

        return <Square
          squarekey={key}
          value={cell}
          availableNumbers={availableNumbers}
          pickNumber={(value) => this.pickNumber(rindex, cindex, value)}
          hasNumberPicker={hasNumberPicker}
          setNumberPicker={() => this.setNumberPicker(rindex, cindex)}/>;
      });
    });
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