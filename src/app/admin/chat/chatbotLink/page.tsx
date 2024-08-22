"use client";
import ChatbotLink from "@/components/admin/ChatbotLink";
import SideBar from "@/components/admin/SideBar";
// import UserData from "@/components/admin/UserData";
import CardContainer from "@/components/cardContainer/CardContainer";
import Header from "@/components/common/Header";
import DynamicForm from "@/components/dynamicForm/DynamicForm";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const page = () => {
  const [documentID, setDocumentID] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDocumentID = getLocalStorageItem("documentId");
      setDocumentID(storedDocumentID);
    }
  }, []);

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

      <Flex justifyContent="space-between" px="14" gap="3">
        <Box w="34%">
          <SideBar />
        </Box>

        <CardContainer
          border={"1px solid #e2e8f0"}
          boxShadow={"sm"}
          borderRadius={"10px"}
          width="100%"
          padding="20px"
        >
          <DynamicForm />
        </CardContainer>
        {documentID ? (
          <Box height="100vh" w="60%">
            <ChatbotLink />
          </Box>
        ) : (
          <CardContainer
            border={"1px solid #e2e8f0"}
            boxShadow={"sm"}
            borderRadius={"10px"}
            width="60%"
            padding="20px"
          >
            <Text as="b" fontSize="24" my="6">
              Please select any file or add text to generate a link.
            </Text>
          </CardContainer>
        )}
      </Flex>
    </>
  );
};

export default page;
