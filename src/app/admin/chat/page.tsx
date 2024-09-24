"use client";
import InputContext from "@/components/admin/InputContext";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Header from "@/components/common/Header";
import SideBar from "@/components/admin/SideBar";
import Script from "next/script";
import { getLocalStorageItem } from "@/utils/localStorage";

const documentId = getLocalStorageItem("documentId");

const page = () => {
  return (
    <>
      <Header />
      <Box p="5px" border="1px solid #fff" w="fit-content">
        <Link href="/">
          <Flex
            m="5"
            p="10px"
            alignItems="center"
            cursor="pointer"
            gap="1"
            _hover={{ bg: "blue.50" }}
          >
            <IoMdArrowBack size="24px" /> Back
          </Flex>
        </Link>
      </Box>

      <Flex
        width="100%"
        height="100vh"
        gap="3"
        justifyContent="space-between"
        px="14"
      >
        <Box w="20% ">
          <SideBar />
        </Box>
        <Box w="100%">
          <InputContext />
        </Box>
      </Flex>

      <Script>
        {`window.embeddedChatbotConfig = {
  chatbotId: "${documentId}",
  domain: "chat-frontend-three-xi.vercel.app"
}`}
      </Script>

      <Script
        src="https://chat-frontend-three-xi.vercel.app/embed.js"
        defer
      ></Script>
    </>
  );
};

export default page;
