import React, { Component } from 'react';
import './App.css';

import SudokuGrid from './components/grid';
import sudoku from './sudoku/sudoku.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      difficulty: 'easy',
      grid: sudoku.createEmpty2dArray(9, 9, '')
    }

    this.solve = this.solve.bind(this);
    this.createSudoku = this.createSudoku.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this._setNumber = this._setNumber.bind(this);
  }

  _setNumber(number, rindex, cindex) {
    const grid = this.state.grid.slice(0);

    grid[rindex][cindex] = number;

    this.setState({ grid });
  }

  setDifficulty(difficulty) {
    this.setState({ difficulty: difficulty.toLowerCase() });
  }

  solve() {
    console.log('just kidding');
  }

  newSudoku() {
    const grid = sudoku.createSudoku(sudoku.createEmpty2dArray(9, 9, 0));
    this.setState({ grid });
  }


  render() {
    return (
      <div className='App'>
        <h1> Sudoku Solver </h1>
        <div className='container'>
          <SudokuGrid grid={this.state.grid} setNumber={(n, r, c) => this._setNumber(n, r, c)}/>
          <div className='buttons'>
            <div className='button' onClick={() => this.createSudoku()}>
              New Sudoku!
            </div>
            <div className='button' onClick={this.solve}>Solve!</div>
          </div>
          <div className='settings'>
            {
              ['Easy', 'Medium', 'Hard', 'Extreme'].map(d => {
                return (<div
                  className={
                    `setting ${this.state.difficulty === d.toLowerCase() ? 'selected' : ''}`
                  }
                  onClick={() => this.setDifficulty(d)}>{d}
                </div>);
              })
            }
            {/*<div className='setting' onClick={() => this.setDifficulty('easy')}>Easy</div>
            <div className='setting' onClick={() => this.setDifficulty('medium')}>Medium</div>
            <div className='setting' onClick={() => this.setDifficulty('hard')}>Hard</div>
            <div className='setting' onClick={() => this.setDifficulty('extreme')}>Extreme</div>*/}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
