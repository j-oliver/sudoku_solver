import React from 'react';

function NumberPicker(props) {
  const numberpickergrid = [1,2,3,4,5,6,7,8,9].map(number => {
    if (props.availableNumbers.indexOf(number) !== -1) {
      return (<span className='numberpicker__number' onBlur={props.onBlur} onClick={() => props.enterNumber(number)}> {number} </span>);
    } else {
      return (<span className='numberpicker__number unavailable' onBlur={props.onBlur}> {number} </span>);
    }
  }, this);

  return <div className='numberpicker'>{numberpickergrid}</div>;
}

export default NumberPicker;