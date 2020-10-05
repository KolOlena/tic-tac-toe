import React from "react";


const WinnerCounter = ({xWin, oWin}) => {

  return (
    <div >
      <div>Winner table</div>
      <div>
        <p>Player X win - {xWin} times</p>
        <p>Player O win - {oWin} times</p>
      </div>

    </div>
  )
}

export default WinnerCounter
