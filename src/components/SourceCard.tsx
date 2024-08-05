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

import { useState, useEffect } from "react";
import { getLocalStorageItem, getOriginUrl } from "@/utils/localStorage";
import { useRouter } from "next/navigation";

const SourceCard = ({ inputData, activeButton, increaseCounter }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [generatedLink, setGeneratedLink] = useState("");
  const router = useRouter();
  const documentID = getLocalStorageItem("documentId");
  const authToken = getLocalStorageItem("authToken");

  useEffect(() => {
    if (!authToken) {
      router.push("/login");
    }
  }, [authToken]);

  useEffect(() => {
    if (documentID) setGeneratedLink(`${getOriginUrl()}/chatbot/${documentID}`);
  }, [increaseCounter]);
  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size="md">Sources</Heading>
        </CardHeader>
        <CardBody>
          {activeButton === "Text" && (
            <>
              <Heading size={"sm"}>Total detected characters</Heading>
              <Text marginBottom={6}>{inputData?.length || 0}</Text>
            </>
          )}
          {!inputData && !isOpen && (
            <Button marginBottom={4} onClick={() => setIsOpen(true)}>
              Generate Link
            </Button>
          )}

          {activeButton === "Files" && documentID && (
            <Flex>
              <Link href={`${getOriginUrl()}/chatbot/${documentID}`} isExternal>
                <Text fontWeight="bold">
                  {`${getOriginUrl()}/chatbot/${documentID}`}
                </Text>
              </Link>

              <IconButton
                aria-label="Copy"
                icon={<CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${getOriginUrl()}/chatbot/${documentID}`
                  );
                  toast.success("Text copied");
                }}
              />
            </Flex>
          )}
          {inputData && activeButton === "Text" && (
            <Flex>
              <Link href={`${getOriginUrl()}/chatbot/${documentID}`} isExternal>
                <Text fontWeight="bold">{generatedLink}</Text>
              </Link>

              <IconButton
                aria-label="Copy"
                icon={<CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  toast.success("Text copied");
                }}
              />
            </Flex>
          )}

          {activeButton === "Activity" && documentID && (
            <Flex>
              <Link href={`${getOriginUrl()}/chatbot/${documentID}`} isExternal>
                <Text fontWeight="bold">{generatedLink}</Text>
              </Link>

              <IconButton
                aria-label="Copy"
                icon={<CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  toast.success("Text copied");
                }}
              />
            </Flex>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default SourceCard;
