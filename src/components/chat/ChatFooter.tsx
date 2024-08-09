"use client";
import { Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";

interface ChatFooterProps {
  setMessage?: any;
  message?: string;
  handleSend?: (e: React.FormEvent | React.MouseEvent, message: string) => void;
}
const ChatFooter = ({ handleSend }: ChatFooterProps) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (e: any) => {
    e.preventDefault();
    handleSend?.(e, message);
    setMessage("");
  };
  return (
    <form style={{ width: "100%" }} onSubmit={sendMessage}>
      <Flex
        color="white"
        w="100%"
        bg="#575782"
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
