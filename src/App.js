import React from 'react';
import './App.css';

import { NumberInputBox } from './Components/number-input/number-input.component';
import { Btn } from './Components/btn/btn.component';

import { inputValidation } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      userTurn: true,
      moveNumber: 0,
      isWinner: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const inputValue = Number(input.value);

    if (inputValidation(inputValue) && !this.state.isWinner) {
      this.handleMove(inputValue);
    }

    input.value = null;
    input.focus();
  };

  handleMove = value => {
    let { total, userTurn, moveNumber, isWinner } = this.state;
    moveNumber++;

    userTurn = !userTurn;

    if (total + value >= 100) {
      total = 100; // never lets the total pass 100
      isWinner = true;
    } else total += value;

    this.setState({ total, userTurn, moveNumber, isWinner }, () => {
      if (total === 100) {
        this.state.userTurn // this looks reverse because the user turn was flipped earlier
          ? console.log('You lost')
          : console.log('You Have Won');
      } else {
        if (!userTurn) this.handleMove(Math.floor(Math.random() * 9 + 1)); // lets the computer have a turn
      }
    });
  };

  handleReset = () => {
    this.setState({
      total: 0,
      userTurn: true,
      moveNumber: 0,
      isWinner: false,
    });
  };

  render() {
    return (
      <div className='App'>
        <h1>{this.state.total}</h1>
        <NumberInputBox
          placeholder='Your Number'
          handleSubmit={this.handleSubmit}
        />
        <Btn placeholder='Reset' handleClick={this.handleReset} />
      </div>
    );
  }
}

export default App;
