import React, { Component } from 'react';

function NumberPicker(props) {
  return (
    <div className='numberpicker'>
      {
        [1,2,3,4,5,6,7,8,9].map(number => {
          return (<span
            className='numberpicker__number'
            onClick={() => props.enterNumber(number)}>
            {number}
          </span>);
        })
      }
    </div>
  );
}

export default class Square extends Component {
  render() {
    return (
      <div className='square'>
        {
          this.props.hasNumberPicker
            ? <NumberPicker enterNumber={(number) => this.props.pickNumber(number)}/>
            : undefined
        }
        <div key={this.props.squarekey} className='cell' onClick={this.props.setNumberPicker}>
          { this.props.value }
        </div>
      </div>
    );
  }
}
