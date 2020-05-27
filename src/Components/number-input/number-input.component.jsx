import React from 'react';

import './number-input.styles.css';

export const NumberInputBox = ({ placeholder, handleSubmit }) => {
  return (
    <div className='enter-number'>
      <form onSubmit={handleSubmit}>
        <input
          className='number-input'
          required
          step='1'
          min='1'
          max='10'
          type='number'
          placeholder={placeholder}
        />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
};
