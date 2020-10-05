import React from "react";
import Cell from "../Cell";

const Square = ({clickHendler, squares}) => {
  const squaresArray = squares.map((square, number) => {
    return (
      <Cell onClick={clickHendler} number={number} square={square}/>
    )
  })
  return (
    <div className='tic-tac-toe'>
      {squaresArray}
    </div>
  )
}

export default Square
