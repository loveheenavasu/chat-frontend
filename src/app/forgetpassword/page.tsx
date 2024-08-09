"use client";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import ForgetPasswordCard from "@/components/forms/ForgetPassword";

const page = () => {
  return (
    <>
      <Flex h="100vh">
        <Flex
          padding="20px"
          justifyContent="center"
          alignItems="center"
          bg="#5080a4"
          w="50%"
          direction="column"
        >
          <ForgetPasswordCard />
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
