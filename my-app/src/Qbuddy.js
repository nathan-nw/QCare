import React, { useState } from "react";
import axios from "axios";
import "./Qbuddy.css";
import { FaCircleArrowUp } from "react-icons/fa6";

function Qbuddy() {
  console.log("API Key:", process.env.REACT_APP_OPENAI_API_KEY);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // OpenAI API Request
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // or gpt-3.5-turbo for cost efficiency
          messages: [
            {
              role: "system",
              content:
                "You are a kind chatbot helping patients in an ER waiting room. No medical advice, and remember that you are only a chatbot that cant interact with the physical world.",
            },
            { role: "user", content: input },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,

            // Replace with your OpenAI API key
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;
      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble responding right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="title">Your Friendly Qbuddy!</div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.sender === "user"
                ? "chatbot-message-user"
                : "chatbot-message-bot"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message chatbot-message-bot">Typing...</div>
        )}
      </div>
      <div className="input-container">
        <input
          className="input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <FaCircleArrowUp className="button" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Qbuddy;
