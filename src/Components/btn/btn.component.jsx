import React from 'react';

import './btn.styles.css';

export const Btn = ({ placeholder, handleClick }) => {
  return (
    <button className='btn large white' id='reset-btn' onClick={handleClick}>
      {placeholder}
    </button>
  );
};
