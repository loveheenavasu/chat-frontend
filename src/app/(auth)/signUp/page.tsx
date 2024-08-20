"use client";
import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Signup from "@/components/forms/Signup";

const page = () => {
  return (
    <Flex h="100vh">
      <Flex
        padding="20px"
        justifyContent="center"
        alignItems="center"
        bg="#5080a4"
        w="50%"
        direction="column"
      >
        <Signup />
      </Flex>
      <Box w="50%">
        <Box position="relative" w="100%" h="100%" bg="black">
          <Image
            w="100%"
            h="100%"
            objectFit="cover"
            src="/images/chatbot2.jpg"
            alt="mainPhoto"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default page;
