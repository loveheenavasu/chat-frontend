"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { Suspense } from "react";
import Image from "next/image";
import Otp from "@/components/Otp";

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
        <Text as="b" p={3} fontSize={36} color={"white"}>
          Enter verification code
        </Text>
        <Suspense>
          <Otp />
        </Suspense>
      </Flex>
      <Box w="50%">
        <Box position="relative" w="100%" h="100%" bg="black">
          <Image
            objectFit="cover"
            layout="fill"
            src="/chatbot2.jpg"
            alt="mainPhoto"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default page;
