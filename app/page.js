"use client";

import React from "react";
import ChatBox from "./component/ChatBox";

export default function Home() {
  const initialMessages = [
    {
      role: "assistant",
      content: `Hi, I'm an AI chat bot to help prepare for interviews, how can I assist you today?`,
    },
  ];

  return (
    <div>
      <ChatBox initialMessages={initialMessages}/>
    </div>
  );
}
