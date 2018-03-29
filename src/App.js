import React, { Component } from 'react';
import './App.css';

import SudokuGrid from './components/grid';

class App extends Component {
  solve() {
    console.log('just kidding');
  }

  render() {
    return (
      <div className="App">
        <h1> Sudoku Solver </h1>
        <div className='container'>
          <SudokuGrid />
          <div className='solvebutton' onClick={this.solve}>Solve!</div>
        </div>
      </div>
    );
  }
}

export default App;
