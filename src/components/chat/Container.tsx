import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import MessageBoxAdmin, { Role } from "./MessageBox";

interface chatMessage {
  chatID?: number | null;
  type: string;
  message: string;
}

interface ChatContainerProps {
  chatMessage: chatMessage[];
  loading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  chatMessage,
  loading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatMessage]);

  return (
    <Flex
      ref={containerRef}
      w="100%"
      direction="column"
      bg="#e9e9ff"
      overflowY="auto"
      h={loading ? "73vh" : "82vh"}
    >
      {chatMessage?.map((ele, id) => {
        return (
          <Flex
            key={id}
            w="100%"
            justifyContent={ele?.type === Role.AI ? "flex-start" : "flex-end"}
          >
            <MessageBoxAdmin data={ele} loading={loading} />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChatContainer;
