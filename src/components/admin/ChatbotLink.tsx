"use client";
import {
  CardBody,
  CardHeader,
  Heading,
  Text,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { CopyIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalStorageItem } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import CardContainer from "@/components/cardContainer/CardContainer";

const ChatbotLink = () => {
  const router = useRouter();
  const [docId, setDocID] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = getLocalStorageItem("authToken");
      if (!authToken) {
        router.push("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const documentId = getLocalStorageItem("documentId");
      setDocID(documentId);
    }
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Box w="100%">
      <CardContainer
        boxShadow="sm"
        border="1px solid #e2e8f0"
        borderRadius="10px"
      >
        <CardHeader>
          <Heading size="md">Your Chatbot Link</Heading>
        </CardHeader>
        <CardBody>
          <Flex gap="3">
            <Link href={`${origin}/chatbot/${docId}`} target="_blank">
              <Text _hover={{ as: "u" }} cursor="pointer" fontWeight="bold">
                {`${origin}/chatbot/${docId}`}
              </Text>
            </Link>

            <IconButton
              aria-label="Copy"
              icon={<CopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(`${origin}/chatbot/${docId}`);
                toast.success("Text copied");
              }}
            />
          </Flex>
        </CardBody>
      </CardContainer>
    </Box>
  );
};

export default ChatbotLink;
