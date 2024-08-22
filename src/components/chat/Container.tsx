import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import MessageBoxAdmin, { Role } from "./MessageBox";

interface chatMessage {
  chatID?: number | null;
  type: string;
  message: string;
}

interface ChatContainerProps {
  chatMessage: chatMessage[];
  loading: boolean;
  bg: string;
  color?: {
    textBg: string;
    textColor: string;
  };
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  chatMessage,
  loading,
  bg,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatMessage]);

  // const bg = router?.query.bg || useColorModeValue('gray.500', '#fff');
  // const color = router?.query.color || useColorModeValue('#fff', 'gray.500');

  return (
    <Flex
      ref={containerRef}
      w="100%"
      direction="column"
      bg={bg}
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
            <MessageBoxAdmin
              data={ele}
              loading={loading}
              bg={bg}
              color={color}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChatContainer;
