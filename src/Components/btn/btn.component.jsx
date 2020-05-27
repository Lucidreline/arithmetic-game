import React from 'react';

export const Btn = ({ placeholder, handleClick }) => {
  return (
    <button className='btn' onClick={handleClick}>
      {placeholder}
    </button>
  );
};
