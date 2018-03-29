import React, { Component } from 'react';
import './App.css';

import SudokuGrid from './components/grid';

class App extends Component {
  solve() {
    console.log('just kidding');
  }

  fill() {
    console.log('you\'re funny');
  }

  render() {
    return (
      <div className="App">
        <h1> Sudoku Solver </h1>
        <div className='container'>
          <SudokuGrid />
          <div className='buttons'>
            <div className='button' onClick={this.fill}>Fill!</div>
            <div className='button' onClick={this.solve}>Solve!</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
