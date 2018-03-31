import React from 'react';

function Options(props) {
  return (
    <div className='buttons'>
      <div className='button' onClick={props.createSudoku}>New Sudoku!</div>
      <div className='button' onClick={props.solve}>Solve!</div>
      <div className='button' onClick={props.reset}>Reset</div>
    </div>
  );
}

export default Options;