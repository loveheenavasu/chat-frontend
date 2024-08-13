"use client";
import React, { useEffect, useState } from "react";
import ChatContainer from "@/components/chat/Container";
import ChatFooter from "@/components/chat/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { SOCKET } from "../../../services/socket";

interface Message {
  chatId: number | null;
  type: "AI" | "user" | string;
  message: string;
  chatSessionId: number | null;
}

const page = ({ params }: any) => {
  const [chatMessage, setChatMessage] = useState<Message[]>([
    {
      chatId: null,
      type: "AI",
      message: "Welcome to our Chatbot",
      chatSessionId: null,
    },
  ]);

  const [chatId, setChatId] = useState<string>("");
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const id = params.slug;

  useEffect(() => {
    SOCKET.connect();
    SOCKET.on("connect", () => {
      console.log(SOCKET.id, "socketId");
    });
    SOCKET.on("searches", (data) => {
      if (data.type === "USER") {
        setLoading(true);
      } else {
        setLoading(false);
      }
      setChatId(data?.chatId);
      setChatSessionId(data?.sessionId);
      setChatMessage((prev) => [...prev, data]);
    });
    SOCKET.on("hi", (e) => console.log(e, "EVENT", SOCKET.id));
    SOCKET.on("error", () => {
      console.log(SOCKET, "Socket");
    });

    return () => {
      SOCKET.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent, message: string) => {
    if (message === "" || message.trim() === "") {
      return null;
    }

    e.preventDefault();
    SOCKET.emit("search", {
      text: message,
      documentId: id,
      ...(chatSessionId && { chatSessionId }),
    });
  };
  console.log(chatMessage);
  return (
    <Box>
      <Header />
      <ChatContainer chatMessage={chatMessage} loading={loading} />
      {loading && (
        <Box bg="#e9e9ff">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="70"
            height="70"
            preserveAspectRatio="xMidYMid"
            fill="yellow"
          >
            <circle cx="30" cy="50" r="5" fill="#1e90ff">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="50" cy="50" r="5" fill="#3cb371">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="-0.75s"
              />
            </circle>
            <circle cx="70" cy="50" r="5" fill="#ff6347">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="-0.5s"
              />
            </circle>
          </svg>
        </Box>
      )}
      <ChatFooter handleSend={handleSend} />
    </Box>
  );
};

export default page;
