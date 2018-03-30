import React from 'react';

function Square(props) {
  return (
    <div className='square'>
      {
        props.numberpicker
      }
      <div key={props.squarekey} className='cell' onClick={props.setNumberPicker}>
        { props.value }
      </div>
    </div>
  );
}

export default Square;