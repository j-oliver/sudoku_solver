import React, { Component } from 'react';


export default class SudokuGrid extends Component {

  constructor() {
    super();

    this.state = {
      solved: false,
      grid: Array(9).fill(Array(9).fill(''))
    }
  }

  getGrid() {
    return this.state.grid.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex + 1}${cindex + 1}`;

        return <div key={key} className='cell'>{key}</div>
      });
    });
  }

  createNewSudoku() {
    // replace this madness with a fancy sudoku generator algorithm
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