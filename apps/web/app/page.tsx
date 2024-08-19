"use client"

import React, { useState } from 'react';
import './Chat.css'; // Import the CSS file
import { useSocket } from '../context/socketProvider';

const Chat: React.FC = () => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Messages Display */}
      <div className="chat-messages">
        <div className="message">
          <p className="message-text">Example message</p>
        </div>
        {/* More messages will go here */}
      </div>

      {/* Message Input and Send Button */}
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="message-input"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
