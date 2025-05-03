import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { sendQuestion } from "../services/api";

export default function HeroChatInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const botReply = await sendQuestion(input);
    setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1a103d] to-[#0d0d0d] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-3 text-center">
          Search with <span className="text-purple-400">Seamless Power</span>
        </h1>
        <p className="text-center mb-6 text-gray-300 text-sm sm:text-base">
          Ask anything about headphones, recommendations, features or models — powered by AI.
        </p>


        <div className="flex items-center w-full max-w-xl mx-auto mb-8 rounded-full bg-[#1e1b36] border border-purple-500 shadow-lg overflow-hidden">
          <div className="pl-4 text-purple-300">
            <FaSearch />
          </div>
          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white focus:outline-none placeholder-gray-400"
            placeholder="Ask a question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 bg-transparent hover:bg-purple-700/10 text-purple-400 rounded-r-full transition"
          >
            <IoIosSend size={20} />
          </button>

        </div>


        <div className="bg-[#2a1e4d] p-4 rounded-xl shadow max-w-3xl mx-auto border border-purple-700">
          <div className="h-96 overflow-y-auto bg-[#1a103d] rounded p-4 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded max-w-[75%] ${msg.role === "user"
                    ? "ml-auto bg-purple-500 text-right text-white"
                    : "mr-auto bg-purple-800 text-left text-purple-200"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
