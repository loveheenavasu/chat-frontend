"use client";
import { Flex, Input } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { VscSend } from "react-icons/vsc";

interface ChatFooterProps {
  setMessage?: string;
  message?: string;
  handleSend?: (e: React.FormEvent | React.MouseEvent, message: string) => void;
  bg: string
}
const ChatFooter: React.FC<ChatFooterProps> = ({ handleSend, bg }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    handleSend?.(e, message);
    setMessage("");
  };

  return (
    <form style={{ width: "100%" }} onSubmit={sendMessage}>
      <Flex
        bottom="0"
        color="white"
        w="100%"
        bg={bg}
        h="80px"
        padding="10px"
        alignItems="center"
        paddingLeft="30px"
        gap="10px"
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
