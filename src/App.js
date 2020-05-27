import React from 'react';
import './App.css';

import { NumberInputBox } from './Components/number-input/number-input.component';

import { inputValidation } from './utils/validation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const inputValue = Number(input.value);

    if (inputValidation(inputValue)) {
      let { total } = this.state;
      this.setState({ total: (total += inputValue) });
    }

    input.value = null;
    input.focus();
  };

  render() {
    return (
      <div className='App'>
        <h1>{this.state.total}</h1>
        <NumberInputBox
          placeholder='Your Number'
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
