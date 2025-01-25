import React, { useState } from "react";
import "./Qbuddy.css";

function Qbuddy() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="container">
      <div className="title">Your Friendly Qbuddy!</div>

      <div className="card">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message chatbot-message-user`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            className="input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qbuddy;
