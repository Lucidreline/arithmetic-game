import React from 'react';

import './chat-box.styles.css';

import { ChatBubble } from '../chat-bubble/chat-bubble.component';

export const ChatBox = ({ messages }) => (
  <div className='chat-box' id='chat-box'>
    {messages.map((message, i) => (
      <ChatBubble key={i} side={message.side} message={message.message} />
    ))}
  </div>
);
