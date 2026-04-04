import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useUser } from "@clerk/react";
import UserTestIamge from "../../assets/UserTestImg.jpg";
import BotTestIamge from "../../assets/AiBotTestImg.jpg";


const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";
  const { isSignedIn, user } = useUser();
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`flex w-full max-w-3xl gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className="flex-shrink-0 flex items-end">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-black">
            {isUser ? <img src={isSignedIn ? user.imageUrl : UserTestIamge} alt="" className="w-full h-full object-cover rounded-full" /> : <img src={BotTestIamge} alt="" className="w-full h-full object-cover rounded-full" />}
          </div>
        </div>
        <div className={`px-4 py-3 rounded-2xl ${isUser ? "bg-black text-white rounded-br-sm" : "bg-gray-100 text-black rounded-bl-sm"}`}>
          <p className="whitespace-pre-wrap leading-relaxed text-base">{text}</p>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex w-full justify-start mb-6">
    <div className="flex w-full max-w-3xl gap-3 flex-row">
      <div className="flex-shrink-0 flex items-end">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-black">
          <img src={BotTestIamge} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <div className="px-4 py-4 rounded-2xl bg-gray-100 rounded-bl-sm flex items-center justify-center">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  </div>
);

const InputBar = ({ input, setInput, handleSend, disabled }) => {
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && input.trim()) {
        handleSend();
      }
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 w-full">
      <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-gray-50 border border-gray-300 rounded-2xl p-2 focus-within:border-black transition-colors">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Message EChat..."
          disabled={disabled}
          className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-2 px-3 text-black placeholder-gray-500"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user", parts: [{ text: userText }] }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API;
      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        throw new Error("API key is not configured.");
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        { contents: newMessages }
      );

      const aiText = response.data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: aiText }] }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "Sorry, an error occurred while communicating with the AI. Please verify your API key and connection." }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto flex flex-col">
          {messages.length === 0 && !isLoading && (
            <div className="flex w-full justify-center mt-20 text-gray-500 font-medium text-center">
              Ready to chat! Send a message to get started.
            </div>
          )}

          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              text={msg.parts[0].text}
            />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <InputBar
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
}
