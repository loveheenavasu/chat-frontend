import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";

const MessageBoxUser = () => {
  return (
    <>
      <Flex gap="5px" padding="20px" alignItems="start" maxW="50%">
        <Box
          minH="45px"
          padding="10px"
          borderRadius="10px"
          bg="white"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);"
        >
          I am very stressed. Life is so borinLife is so boring
        </Box>
        <Avatar
          mr={2}
          size="md"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </Flex>
    </>
  );
};

export default MessageBoxUser;
