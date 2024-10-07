import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import MessageBoxAdmin, { Role } from "./MessageBox";

interface ChatMessage {
  chatId?: number | null;
  type: string;
  message: string;
  questionType?: string;
  nextType?: string;
}

interface ChatContainerProps {
  chatMessages: ChatMessage[];
  loading: boolean;
  bg: string;
  color?: {
    textBg: string;
    textColor: string;
  };
  themeColor?: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  chatMessages,
  loading,
  bg,
  color,
  themeColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Flex
      ref={containerRef}
      w="100%"
      direction="column"
      bg={bg}
      overflowY="auto"
      h={loading ? "78vh" : "93vh"}
      paddingY="30px"
    >
      {chatMessages.map((msg, index) => (
        <Flex
          key={index}
          w="100%"
          justifyContent={msg.type === "AI" ? "flex-start" : "flex-end"}
          p={2}
        >
          <MessageBoxAdmin
            loading={loading}
            data={msg}
            color={color}
            themeColor={themeColor}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default ChatContainer;
