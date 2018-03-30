import React, { Component } from 'react';

import Square from './square.js';
import NumberPicker from './numberpicker.js';
import sudoku from '../sudoku/sudoku.js';


export default class SudokuGrid extends Component {
  constructor() {
    super();

    this.state = {
      numberpicker: { rindex: -1, cindex: -1 }
    }

    this._pickNumber = this._pickNumber.bind(this);
  }

  _pickNumber(number, rindex, cindex) {
    this.props.setNumber(number, rindex, cindex);

    this.setState({ numberpicker: { rindex: -1, cindex: -1 }});
  }

  resetNumberPicker() {
    this.setState({ numberpicker: { rindex: -1, cindex: -1 }});
  }

  setNumberPicker(rindex, cindex) {
    this.setState({ numberpicker: { rindex, cindex }})
  }

  getGrid() {
    const grid = this.props.grid;

    return grid.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex}${cindex}`;
        const availableNumbers = sudoku.getValidNumbersForCell(rindex, cindex, grid);

        const hasNumberPicker =
          this.state.numberpicker.rindex === rindex &&
          this.state.numberpicker.cindex === cindex;
        const numberpicker = hasNumberPicker
          ? <NumberPicker
              availableNumbers={availableNumbers}
              enterNumber={(number) => this._pickNumber(number, rindex, cindex)}
              onBlur={this.resetNumberPicker}/>
          : undefined;

        return <Square
          squarekey={key}
          value={cell}
          numberpicker={numberpicker}
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