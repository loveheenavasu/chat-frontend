"use client";
import Embed from "@/components/admin/Embed";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/common/Header";
import { getLocalStorageItem } from "@/utils/localStorage";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
        <Box w="20%">
          <SideBar />
        </Box>

        {documentID ? (
          <Box height="100vh" w="100%">
            <Embed />
          </Box>
        ) : (
          <Text
            height="100vh"
            w="100%"
            as="b"
            fontSize="24"
            my="6"
            textAlign="center"
          >
            Please select any file or add text to connect.
          </Text>
        )}
      </Flex>
    </>
  );
};

export default page;
