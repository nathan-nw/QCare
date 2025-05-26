import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Qbuddy.css";
import { FaCircleArrowUp } from "react-icons/fa6";

// 🔁 Local Firebase Function URL
// const LOCAL_QBUDDY_URL = "http://localhost:5001/qcare-b7741/us-central1/qbuddyChat";
const LOCAL_QBUDDY_URL = "https://b67b-2605-8d80-5c0-4a6-adcb-544e-7af0-25e7.ngrok-free.app/qcare-b7741/us-central1/qbuddyChat";

function Qbuddy() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // ✅ Call your local Firebase function
      const response = await axios.post(LOCAL_QBUDDY_URL, {
        message: input,
      });

      const botResponse = response.data.reply;
      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="QBuddyWrapper">
      <div className="QBuddycontainer">
        <div className="title5">QBuddy</div>

        {/* Back to Home Button */}
        <button className="back-button" onClick={() => navigate("/")}></button>

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

        <div className="input-container2">
          <input
            className="input1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <FaCircleArrowUp className="button3" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Qbuddy;
