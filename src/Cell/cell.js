import React, { Component } from "react";
export default class Cell extends Component {
  render() {
    const {onClick, number, square} = this.props;
    return (
      <div className='ttt-grid' onClick={onClick} data={number}>{square}</div>
    )
  }
}
