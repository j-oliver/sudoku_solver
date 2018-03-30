import React, { Component } from 'react';
import './App.css';

import SudokuGrid from './components/grid';
import sudoku from './sudoku/sudoku.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      grid: sudoku.createEmpty2dArray(9, 9, '')
    }
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
          <SudokuGrid grid={this.state.grid}/>
          <div className='buttons'>
            <div className='button' onClick={() => this.newSudoku()}>
              New Sudoku!
            </div>
            <div className='button' onClick={this.solve}>Solve!</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
