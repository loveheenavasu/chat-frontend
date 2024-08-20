"use client";
import ChatbotLink from "@/components/admin/ChatbotLink";
import DynamicForm from "@/components/dynamicForm/DynamicForm";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
          <ChatbotLink />
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
