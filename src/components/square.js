import React from 'react';

function Square(props) {
  function handleClick(e) {
    e.preventDefault();
    if (e.nativeEvent.which === 1 && props.showNumberPicker) { // left click
      props.showNumberPicker();
    } else if (e.nativeEvent.which === 3 && props.removeNumber) { // right click
      props.removeNumber();
    }
  }

  return (
    <div key={props.squarekey} className='square'>
      {
        props.numberpicker
        ? props.numberpicker
        : (<div className={`cell ${props.css}`} onClick={handleClick} onContextMenu={handleClick}>
            { props.value }
          </div>)
      }
    </div>
  );
}

export default Square;