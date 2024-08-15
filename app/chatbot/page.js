import ChatBox from "../component/ChatBox";

export default function Chat() {
  const initialMessages = [
    {
      role: "assistant",
      content: `Hi, I'm an AI chat bot to help prepare for interviews, how can I assist you today?`,
    },
  ];
  return <ChatBox initialMessages={initialMessages}/>;
}
