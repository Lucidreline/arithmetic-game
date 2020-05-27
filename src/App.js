import React from 'react';
import './App.css';

import { NumberInputBox } from './Components/number-input/number-input.component';
import { Btn } from './Components/btn/btn.component';

import { inputValidation, findNextTarget } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      userTurn: true,
      isWinner: false,
      computerLogicTrigger: 0,
    };
  }

  componentDidMount() {
    this.handleReset();
  }

  handleReset = () => {
    this.setState(
      {
        total: 0,
        userTurn: Math.random() >= 0.5,
        isWinner: false,
        computerLogicTrigger: Math.floor(Math.random() * 30 + 36),
      },
      () => {
        if (!this.state.userTurn) this.handleMove(this.computerLogic());
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const inputValue = Number(input.value);

    if (
      this.state.userTurn &&
      inputValidation(inputValue) &&
      !this.state.isWinner
    ) {
      this.handleMove(inputValue);
    }

    input.value = null; // Clears the input
    input.focus(); // Prevents the user from having to click on the input after each move
  };

  handleMove = value => {
    console.log(value);
    let { total, userTurn, isWinner } = this.state;

    userTurn = !userTurn;

    if (total + value >= 100) {
      total = 100; // never lets the total pass 100
      isWinner = true;
    } else total += value;

    this.setState({ total, userTurn, isWinner }, () => {
      if (total === 100) {
        this.state.userTurn // this looks reverse because the user turn was flipped earlier
          ? console.log('You lost')
          : console.log('You Have Won');
      } else {
        if (!userTurn) this.handleMove(this.computerLogic()); // lets the computer have a turn
      }
    });
  };

  computerLogic = () => {
    let output = Math.floor(Math.random() * 10 + 1); // this will change to a better number as long as there are no errors

    if (this.state.total >= this.state.computerLogicTrigger) {
      // This will start working randomly in the game to help prevent the pattern from being reconized
      // This will make a logical move instead of a random guess
      const target = findNextTarget(this.state.total);
      const possibleOutput = target - this.state.total;
      if (target && inputValidation(possibleOutput) && possibleOutput <= 10) {
        output = possibleOutput;
      }
    }
    return output;
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
