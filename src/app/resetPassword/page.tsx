"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Image from "next/image";
import Resetpassword from "@/components/forms/Resetpassword";

const page = () => {
  return (
    <>
      <Flex w="100%" h="100vh">
        <Flex
          padding="20px"
          justifyContent="center"
          alignItems="center"
          bg="#5080a4"
          w="50%"
          direction="column"
        >
          <Resetpassword />
        </Flex>
        <Box w="50%">
          <Box position="relative" w="100%" h="100%" bg="black">
            <Image
              objectFit="cover"
              layout="fill"
              src="/images/chatbot2.jpg"
              alt="mainPhoto"
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default page;
