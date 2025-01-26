import React, { useState } from "react";
import "./Qbuddy.css";
import { FaCircleArrowUp } from "react-icons/fa6";

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

      {/* <div className="card"> */}
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
        <FaCircleArrowUp className="button" onClick={handleSendMessage}>
          Send
        </FaCircleArrowUp>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Qbuddy;
