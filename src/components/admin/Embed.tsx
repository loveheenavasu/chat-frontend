"use client";
import {
  Box,
  Card,
  CardHeader,
  Code,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getLocalStorageItem } from "@/utils/localStorage";

const Embed = () => {
  const documentId = getLocalStorageItem("documentId");
  return (
    <Box>
      <Card
        w={"100%"}
        padding={"20px"}
        textAlign={"start"}
        border={" 1px solid #e2e8f0"}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md" textAlign={"start"} pt={"0px!important"}>
              Connect
            </Heading>
          </CardHeader>
          <Box w="100%">
            <Text as="b">chat-frontend-three-xi</Text>
            <Text my="4">
              To add the chatbot anywhere on your website, add this iframe to
              your HTML code
            </Text>
            {documentId && (
              <Code p="4" colorScheme="blackAlpha" w="100%">
                <pre>
                  {`<iframe 
src='https://chat-frontend-three-xi.vercel.app/chatbot/${
                    documentId ? documentId : undefined
                  }'    
width="100%"
style="height: 100%; min-height: 700px"
frameBorder="0"
></iframe>`}
                </pre>
              </Code>
            )}
          </Box>
          <Box w="100%">
            <Text my="4">
              To add a chat bubble to the bottom right of your website, add this
              script tag to your HTML
            </Text>
            {documentId && (
              <Code p="4" w="100%" colorScheme="blackAlpha">
                <pre>{`<script
src ="https://chat-frontend-three-xi.vercel.app/chatbot-widget.min.js";
chatbotId= ${documentId},
domain= "https://chat-frontend-three-xi.vercel.app"
defer>
</script>`}</pre>
              </Code>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Embed;
