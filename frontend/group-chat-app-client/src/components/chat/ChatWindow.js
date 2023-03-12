import React, { useState } from 'react';
import axios from 'axios';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageInput.trim() === '') {
      return;
    }
    const newMessage = {
      text: messageInput,
      sender: 'Me',
      timestamp: new Date(),
    };
    axios.post("https://localhost:3000/api/messages/:groupId", {newMessage})
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="message-sender">{message.sender}</span>
            <span className="message-text">{message.text}</span>
            <span className="message-timestamp">{message.timestamp.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={messageInput} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
