"use client";
import ChatbotLink from "@/components/admin/ChatbotLink";
import SideBar from "@/components/admin/SideBar";
// import UserData from "@/components/admin/UserData";
import Header from "@/components/common/Header";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
      {documentID ? (
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
            <Box w="20%">
              <SideBar />
            </Box>

            {/* <Box w="100%" mx="10">
              <UserData />
            </Box> */}

            <Box height="100vh" w="60%">
              <ChatbotLink />
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            w="100%"
            h="100vh"
          >
            <Text as="b" fontSize="24" my="6">
              Please select any file or add text to generate a link.
            </Text>
            <Link href="/admin/chat">
              <Button bg="#5188b9" color="white" _hover={{}}>
                Go Back
              </Button>
            </Link>
          </Flex>
        </>
      )}
    </>
  );
};

export default page;
