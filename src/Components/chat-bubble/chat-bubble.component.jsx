import React from 'react';

export const ChatBubble = ({ side, message }) => (
  <div className={side}>
    <p>{message}</p>
  </div>
);
