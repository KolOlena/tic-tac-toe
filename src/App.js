import React, { Component } from 'react';
import './App.css';
import Square from "./Square";
import WinnerCounter from "./WinnerCounter";

export default class App extends Component {
  state = {
    square: Array(9).fill(null),
    massage: '',
    count: 0,
    errorText: 'Please, choose another cell',
    deadHeat: 'Tie',
    xWin: 0,
    oWin: 0,
    x: 'X',
    o: 'O'
  }

  winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  isAlreadyWinner = false;

  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? this.state.o : this.state.x;
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if (this.state.square[line[0]] === s
        && this.state.square[line[1]] === s
        && this.state.square[line[2]] === s) {
        this.isAlreadyWinner = true

        this.setState(() => {
          return {
            massage: this.winAlert(s)
          }
        });



        if (s === this.state.o) {
          this.setState(({oWin}) => {
            return {
              oWin: this.winnerCounter(oWin)
            }
          })
        } else if (s === this.state.x) {
          this.setState(({xWin}) => {
            // let count = xWin + 1
            return {
              xWin: this.winnerCounter(xWin)
            }
          })
        }

        setTimeout(() => {
          this.setState({square: Array(9).fill(null)});
          this.setState({count: 0});
          this.setState({massage: ''});
          this.isAlreadyWinner = false
        }, 4000)
      }
      if (this.state.count === 9) {
        this.setState({massage: this.state.deadHeat});
        setTimeout(() => {
          this.setState({square: Array(9).fill(null)});
          this.setState({count: 0});
          this.setState({massage: ''});
        }, 2000)

      }
    }
  }

  winAlert = (name) => {
    return `${name} is win`
  }
  winnerCounter = (name) => {
    return name + 1
  }

  changeStateArray = (arr, data) => {
    const oldItem = arr.slice(0, data)
    const fill = (this.state.count % 2 === 0) ? 'X' : 'O';
    const newItem = arr.slice(Number(data) + 1)
    return [...oldItem, fill, ...newItem]
  }

  chengeCounter = (count) => {
    return count + 1
  }

  clickHendler = event => {
    if (this.isAlreadyWinner) return
    if (this.state.massage === this.state.errorText) {
      this.setState({massage: ''});
    }
    let data = event.target.getAttribute('data'); //номер елемента в масиве
    let currentSquare = this.state.square; //масив елементов
    if (currentSquare[data] === null) { //если елемент пустой то выполнять
      this.setState(
        (() => {
          return {
            square: this.changeStateArray(currentSquare, data)
          }
        }), this.isWinner)

      this.setState(({count}) => {
        return {
          count: this.chengeCounter(count)
        }
      });
    } else {
      this.setState({massage: this.state.errorText});
    }
    console.log(this.state);

  }


  render() {
    let classNames = 'massages'
    if (this.state.massage === this.state.errorText) {
      classNames += ' red-text'
    }    if (this.state.massage === this.state.deadHeat) {
      classNames += ' yellow-text'
    }

    return (
      <div className='main'>
        <div className='play-field'>
          <div>
            <Square clickHendler={this.clickHendler} squares={this.state.square}/>
          </div>
          <div className={classNames}>
            {this.state.massage}
          </div>
        </div>
        <div className='winner-counter'>
          <WinnerCounter xWin={this.state.xWin} oWin={this.state.oWin}/>
        </div>
      </div>
    )
  }
}


