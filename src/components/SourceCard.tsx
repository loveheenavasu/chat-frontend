"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { getLocalStorageItem, getOriginUrl } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import CardContainer from "@/components/cardContainer/CardContainer";

const SourceCard = ({ inputData, activeButton, increaseCounter }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const router = useRouter();
  let documentID = getLocalStorageItem("documentId");
  console.log(documentID, 'documentID')

  const authToken = getLocalStorageItem("authToken");
  const theme = getLocalStorageItem("selectedTheme")

  useEffect(() => {
    if (!authToken) {
      router.push("/login");
    }
  }, [authToken]);

  useEffect(() => {
    if (documentID) setGeneratedLink(`${getOriginUrl()}/chatbot/${documentID}`);
  }, [increaseCounter]);

  const handleCopy = () => {
    if (documentID && theme) {
      navigator.clipboard.writeText(
        `${getOriginUrl()}/chatbot/${documentID}`
      );
      toast.success("Text copied");
    }
  }
  const renderContent = () => {
    switch (activeButton) {
      case 'Text':
        return (
          <>
            <Heading size={"sm"}>Total detected characters</Heading>
            <Text marginBottom={6}>{inputData?.length || 0}</Text>
            <Link href={`${getOriginUrl()}/chatbot/${documentID}`} isExternal>
              <Text fontWeight="bold">{generatedLink}</Text>
            </Link>

            {documentID && (
              <IconButton
                aria-label="Copy"
                icon={<CopyIcon />}
                onClick={handleCopy}
              />
            )}


          </>
        )
      case 'Files':
      case 'Activity':
        return (
          <>
            <Flex>
              <Link href={`${getOriginUrl()}/chatbot/${documentID}`} isExternal>
                <Text fontWeight="bold">{generatedLink}</Text>
              </Link>

              {documentID && (
                <IconButton
                  aria-label="Copy"
                  icon={<CopyIcon />}
                  onClick={handleCopy}
                />
              )}
            </Flex>
          </>
        )
      default:
        break;
    }
  }
  return (
    <Box>
      <CardContainer
        boxShadow="sm"
        border="1px solid #e2e8f0"
        borderRadius="10px"
      >
        <CardHeader>
          <Heading size="md">Sources</Heading>
        </CardHeader>
        <CardBody>
          {!inputData && !isOpen && (
            <Button marginBottom={4} onClick={() => setIsOpen(true)}>
              Generate Link
            </Button>
          )}
          {renderContent()}
        </CardBody>
      </CardContainer>
    </Box>
  );
};

export default SourceCard;
