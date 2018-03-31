import React, { Component } from 'react';

import Square from './square.js';
import NumberPicker from './numberpicker.js';
import sudoku from '../sudoku/sudoku.js';

class Sudoku extends Component {
  constructor() {
    super();

    this.state = {
      npExists: false,
      numberpicker: { rindex: -1, cindex: -1 }
    }

    this._pickNumber = this._pickNumber.bind(this);
    this._resetNumberPicker = this._resetNumberPicker.bind(this);
  }

  _pickNumber(number, rindex, cindex) {
    this.props.setNumber(number, rindex, cindex);

    this.setState({
      npExists: false,
      numberpicker: { rindex: -1, cindex: -1 }
    });
  }

  _resetNumberPicker() {
    // really hacky
    setTimeout(() => {
      this.setState({
        npExists: false,
        numberpicker: { rindex: -1, cindex: -1 }
      });
    }, 50);
  }

  _showNumberPicker(rindex, cindex) {
    console.log('showNumberPicker called');
    if (!this.state.npExists) {
      console.log('npExists in showNumberPicker is false');
      this.setState({
        npExists: true,
        numberpicker: { rindex, cindex }
      });
    }
  }

  cellIsBlocked(rindex, cindex) {
    return this.props.initialgrid[rindex][cindex] !== '';
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
              resetNumberPicker={this._resetNumberPicker}
              stopPropagation={true}/>
          : undefined;

        if (this.cellIsBlocked(rindex, cindex)) {
          return <Square css='initial' squarekey={key} value={cell}/>;
        } else {
          return <Square
            squarekey={key}
            value={cell}
            css={''}
            numberpicker={numberpicker}
            showNumberPicker={() => this._showNumberPicker(rindex, cindex)}
            resetNumberPicker={() => this._resetNumberPicker()}/>;
        }
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

export default Sudoku;