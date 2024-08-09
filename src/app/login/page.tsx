"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "@/components/forms/Login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage";

const Page = () => {
  const router = useRouter();
  const authToken = getLocalStorageItem("authToken");
  useEffect(() => {
    if (authToken) {
      router.push("/");
    }
  }, [authToken]);

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
          <Login />
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

export default Page;
