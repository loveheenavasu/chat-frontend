"use client";
import { Fields } from "@/app/chatbot/[slug]/page";
import { Flex, Input } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { toast } from "react-toastify";

interface ChatFooterProps {
  setMessage?: string;
  message?: string;
  handleSend?: (e: React.FormEvent | React.MouseEvent, message: string) => void;
  bg: string;
  inputFields?: any;
  isFormCompleted: string | null | undefined;
}
const ChatFooter: React.FC<ChatFooterProps> = ({
  handleSend,
  bg,
  inputFields,
  isFormCompleted,
}) => {
  const [message, setMessage] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (isFormCompleted === "false") {
      if (inputFields[currentIndex]?.type === "tel") {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(message)) {
          toast.error("Please enter the valid phone number");
          return;
        }
      }
    }
    handleSend?.(e, message);
    setMessage("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <form style={{ width: "100%" }} onSubmit={sendMessage}>
      <Flex
        bottom="-3px"
        color="white"
        w="100%"
        bg={bg}
        h="80px"
        padding="10px"
        alignItems="center"
        paddingLeft="30px"
        gap="10px"
        position="fixed"
      >
        <Input
          bg="white"
          color="black"
          variant="filled"
          height="40px"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ backgroundColor: "white" }}
          type={isFormCompleted === "false" && inputFields[currentIndex]?.type}
        />

        <VscSend
          role="button"
          type="button"
          fontSize={30}
          onClick={sendMessage}
        />
      </Flex>
    </form>

  );
};

export default ChatFooter;
