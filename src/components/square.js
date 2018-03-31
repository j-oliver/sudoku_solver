import React from 'react';

function Square(props) {
  return (
    <div key={props.squarekey} className='square'>
      {
        props.numberpicker
        ? props.numberpicker
        : (<div className={`cell ${props.css}`} onClick={props.showNumberPicker}>
            { props.value }
          </div>)
      }
    </div>
  );
}

export default Square;