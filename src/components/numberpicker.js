import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class NumberPicker extends Component {
  handleClickOutside(e) {
    e.stopPropagation();
    this.props.resetNumberPicker();
  }

  render() {
    const numberpickergrid = [1,2,3,4,5,6,7,8,9].map(number => {
      if (this.props.availableNumbers.indexOf(number) !== -1) {
        return (<span key={number} className='numberpicker__number' onClick={() => this.props.enterNumber(number)}> {number} </span>);
      } else {
        return (<span key={number} className='numberpicker__number unavailable'> {number} </span>);
      }
    }, this);

    return <div className='numberpicker'>{numberpickergrid}</div>;
  }
}

export default onClickOutside(NumberPicker);