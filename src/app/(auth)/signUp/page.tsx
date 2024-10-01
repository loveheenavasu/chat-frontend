"use client";
import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Signup from "@/components/forms/Signup";

const Page = () => {
  return (
    <Flex h="100vh" flexDirection={{ base: "column", md: "row" }}>
      <Flex
        padding="20px"
        justifyContent="center"
        alignItems="center"
        bg="#5080a4"
        w={{ base: "100%", md: "50%" }}
        direction="column"
      >
        <Signup />
      </Flex>
      <Box w={{ base: "100%", md: "50%" }}>
        {" "}
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

export default Page;
