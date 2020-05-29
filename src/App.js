import React from 'react';
import './App.css';

import { ChatBox } from './Components/chat-box/chat-box.component';
import { NumberInputBox } from './Components/number-input/number-input.component';
import { Btn } from './Components/btn/btn.component';

import { inputValidation, findNextTarget } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      userTurn: true,
      messages: [],
      isWinner: false,
      computerLogicTrigger: 0,
      firstTry: true,
    };
  }

  componentDidMount() {
    const side = 'left';
    const introMessages = [
      {
        side,
        message: 'Welcome to my arithmetic game!',
      },
      {
        side,
        message: 'Rules are simple.',
      },
      {
        side,
        message: 'We both choose numbers from 1-10.',
      },
      {
        side,
        message: 'These numbers are added to a total.',
      },
      {
        side,
        message: 'If the total reaches 100 on your turn, you win!',
      },
      {
        side,
        message: 'If the total reaches 100 on MY turn, I WIN!',
      },
    ];
    this.setState({ messages: introMessages }, () => this.handleReset());
  }

  handleReset = () => {
    let { firstTry, messages } = this.state;
    firstTry ? (firstTry = false) : (messages = []); // Keeps the intro message if the game has never been reset

    messages.push({
      side: 'left',
      message: "let's flip a coin to see who starts.",
    });
    const userTurn = Math.random() >= 0.5;
    userTurn
      ? messages.push({ side: 'left', message: 'Heads! You start!' })
      : messages.push({ side: 'left', message: 'Tails! I start!' });
    this.setState(
      {
        total: 0,
        userTurn,
        isWinner: false,
        computerLogicTrigger: Math.floor(Math.random() * 30 + 36),
        messages,
        firstTry,
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
    let { total, userTurn, isWinner, messages } = this.state;

    let player;
    let side;

    if (userTurn) {
      player = 'You';
      side = 'right';
    } else {
      player = 'The Comp';
      side = 'left';
    }

    messages.push({ side, message: `${player} added ${value}!` });

    if (total + value >= 100) {
      total = 100; // never lets the total pass 100
      isWinner = true;

      this.state.userTurn // this looks reverse because the user turn was flipped earlier
        ? messages.push({ side: 'left', message: 'I... I lost... :(' })
        : messages.push({ side: 'left', message: 'I WIN!!' });
    } else total += value;

    userTurn = !userTurn;

    this.setState({ total, userTurn, isWinner, messages }, () => {
      if (!userTurn & (total !== 100)) this.handleMove(this.computerLogic()); // lets the computer have a turn

      const chatBox = document.getElementById('chat-box');
      chatBox.scrollTop = chatBox.scrollHeight; // stays scrolled down to the bottom of the convo
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
        <ChatBox messages={this.state.messages} />
        <h1 id='total'>Total: {this.state.total}</h1>
        <div id='input-section'>
          <NumberInputBox
            placeholder='Your Number'
            handleSubmit={this.handleSubmit}
          />
          <Btn placeholder='Reset' handleClick={this.handleReset} />
        </div>
      </div>
    );
  }
}

export default App;
