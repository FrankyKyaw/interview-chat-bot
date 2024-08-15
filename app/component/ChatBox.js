"use client"
import React, { useEffect, useRef } from "react";
import { useState } from "react";

const ChatBox = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);

  const message_limit = 10;

  const checkMessageLimit = () => {
    const messageCount = parseInt(localStorage.getItem("messageCount") || 0);
    return messageCount < message_limit;
  }
  const incrementMessageCount = () => {
    const messageCount = parseInt(localStorage.getItem("messageCount") || 0);
    localStorage.setItem("messageCount", messageCount + 1);

  }

  const handleSendMessage = async () => {

    if (!checkMessageLimit()) {
      alert("You have reached the message limit for this session.");
      return;
    }

    if (message.trim()) {
      const newMessages = [...messages, { role: "user", content: message }];
      setMessages(newMessages);
      setMessage("");
      setIsSending(true);

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newMessages }),
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let botResponse = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value);
          botResponse += chunk;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (
              updatedMessages[updatedMessages.length - 1]?.role === "assistant"
            ) {
              updatedMessages[updatedMessages.length - 1].content = botResponse;
            } else {
              updatedMessages.push({ role: "assistant", content: botResponse });
            }
            return updatedMessages;
          });
        }
        incrementMessageCount();
      } catch (error) {
        console.error(error);
      } finally {
        setIsSending(false);
      }
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex items-center py-4 h-screen justify-center bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700">
      <div className="w-full max-w-lg h-full bg-white shadow-2xl rounded-lg flex flex-col">
        <h1 className="text-center text-2xl font-bold py-4 text-gray-800 border-b">
          Interview AI support
        </h1>
        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-blue-400 shadow-md"
                    : "bg-green-400 shadow-md"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t rounded-b-lg border-gray-300 bg-gray-100 flex">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:border-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            disabled={isSending}
            className="ml-2 bg-blue-500 px-4 text-white rounded-lg hover:bg-blue-600 shadow-lg disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
