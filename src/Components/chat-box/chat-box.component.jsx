import React from 'react';

import { ChatBubble } from '../chat-bubble/chat-bubble.component';

export const ChatBox = ({ messages }) => (
  <div>
    {messages.map((message, i) => (
      <ChatBubble key={i} side={message.side} message={message.message} />
    ))}
  </div>
);
