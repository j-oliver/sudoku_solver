import React, { Component } from 'react';
import './App.css';

import Sudoku from './components/grid.js';
import Options from './components/options.js';
import Settings from './components/settings.js';
import sudoku from './sudoku/sudoku.js';

class App extends Component {
  constructor() {
    super();

    const difficulty = 'easy';
    const initialgrid = sudoku.createSudoku('easy');
    const grid = initialgrid.map(row => row.slice());

    this.state = { difficulty, initialgrid, grid };


    this._setNumber = this._setNumber.bind(this);
    this._setDifficulty = this._setDifficulty.bind(this);
    this._solve = this._solve.bind(this);
    this._createSudoku = this._createSudoku.bind(this);
    this._resetSudoku = this._resetSudoku.bind(this);
  }

  _setNumber(number, rindex, cindex) {
    const grid = this.state.grid.slice();

    grid[rindex][cindex] = number;

    this.setState({ grid });
  }

  _setDifficulty(difficulty) {
    this.setState({ difficulty: difficulty.toLowerCase() });
  }

  _solve() {
    const solvedSudoku = sudoku.solveSudoku(this.state.grid);

    this.setState({ grid: solvedSudoku });
  }

  _createSudoku() {
    const initialgrid = sudoku.createSudoku(this.state.difficulty);
    const grid = initialgrid.map(row => row.slice());

    this.setState({ initialgrid, grid });
  }

  _resetSudoku() {
    const resetSudoku = this.state.initialgrid.map(row => row.slice());

    this.setState({ grid: resetSudoku });
  }


  render() {
    return (
      <div className='App'>
        <h1>Motivation Sudoku</h1>
        <div className='container'>
          <Sudoku initialgrid={this.state.initialgrid} grid={this.state.grid} setNumber={(n, r, c) => this._setNumber(n, r, c)}/>
          <Options solve={this._solve} createSudoku={this._createSudoku} reset={this._resetSudoku}/>
          <Settings difficulty={this.state.difficulty} setDifficulty={this._setDifficulty}/>
        </div>
      </div>
    );
  }

}

export default App;
