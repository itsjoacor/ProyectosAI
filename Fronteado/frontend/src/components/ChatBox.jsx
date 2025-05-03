import { useEffect, useState } from "react";
import { sendQuestion } from "../services/api";
import { IoMdSend } from "react-icons/io";

export default function ChatBox({ initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (initialMessage) {
      const run = async () => {
        await handleSend(initialMessage);
      };
      run();
    }
  }, [initialMessage]);

  const handleSend = async (msg) => {
    const messageToSend = msg || input;
    if (!messageToSend.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: messageToSend }]);
    setInput("");

    const botReply = await sendQuestion(messageToSend);
    setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-[#2a1e4d] border border-purple-700 rounded-xl shadow-md text-white">
      <h3 className="text-lg font-bold text-center mb-4">💬 Chat With Your AI Headphone Expert</h3>

      <div className="h-80 overflow-y-auto border border-purple-500 rounded p-3 bg-[#1a103d] space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm px-3 py-2 rounded max-w-[75%] ${
              msg.role === "user"
                ? "ml-auto bg-purple-500 text-right text-white"
                : "mr-auto bg-purple-900 text-left text-purple-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          className="flex-grow bg-[#1a103d] border border-purple-600 rounded-l px-3 py-2 text-sm text-white placeholder-purple-300"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700"
        >
          <IoMdSend size={20} />
        </button>
      </div>
    </div>
  );
}
