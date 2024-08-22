import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export enum Role {
  User = "USER",
  AI = "AI",
}

interface Message {
  chatId?: number | null;
  type: string;
  message: string;
}

interface MessageBoxAdminProps {
  data: Message;
  loading: boolean;
  color?: {
    textBg: string;
    textColor: string;
  };
  bg?: string;
}

const MessageBoxAdmin: React.FC<MessageBoxAdminProps> = ({ data, color }) => {
  return (
    <>
      <Flex alignItems="start" p="20px" gap="5px" maxW="50%">
        <Box
          minH="45px"
          padding="10px"
          borderRadius="10px"
          bg={data.type === "AI" ? color?.textBg : "blue"}
          color={data.type === "AI" ? color?.textColor : "white"}
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);"
        >
          {data?.message}
        </Box>
      </Flex>
    </>
  );
};

export default MessageBoxAdmin;
