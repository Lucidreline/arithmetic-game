import React from 'react';

import './chat-bubble.styles.css';

export const ChatBubble = ({ side, message }) => (
  <div className={side + ' chat-bubble'}>
    <p className='msg'>{message}</p>
  </div>
);
