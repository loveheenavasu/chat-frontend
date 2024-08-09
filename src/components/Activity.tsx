"use client";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import ChatBase from "./ChatBase";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CardContainer from "@/components/cardContainer/CardContainer";

interface Message {
  _id: string;
  message: string;
  messageType: "USER" | "AI";
  createdAt: number;
  sessionId: number;
}
interface ChatMessage {
  _id?: string;
  chatID?: number | null;
  message: Message[];
}

interface ChatContainerProps {
  initialChatMessages: ChatMessage[];
  loading: boolean;
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Activity: React.FC<ChatContainerProps> = ({
  initialChatMessages,
  loading,
}) => {
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialChatMessages);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [screenLoading, setscreenLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchChatRecords = async () => {
      const documentId = localStorage.getItem("documentId");
      try {
        setscreenLoading(true);
        const response = await axiosInstance.get(
          `/user/chat-history?documentId=${documentId ? `${documentId}` : null}`
        );
        setChatMessages(
          response.data?.data?.messages || response.data?.data || []
        );
        setscreenLoading(false);
      } catch (error) {
        console.error("Error fetching chat records:", error);
        setscreenLoading(false);
      }
    };

    fetchChatRecords();
  }, []);

  const handleChatBase = async (sessionId: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `user/chat?sessionId=${sessionId}`
      );
      setUserMessages(
        response.data?.data?.messages || response.data?.data || []
      );
    } catch (error) {
      console.error("Error fetching user messages:", error);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <CardContainer
        width={"100%"}
        height="600px"
        border={"1px solid #e2e8f0"}
        boxShadow={"sm"}
        padding={"20px"}
        borderRadius={"10px"}
        as={false}
      >
        <Box paddingBottom="20px">
          <Heading fontSize="20px">Chats Logs</Heading>
        </Box>
        <Box>
          {screenLoading ? (
            <Box>
              <Flex justifyContent={"center"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            </Box>
          ) : (
            <Flex gap="20px">
              <Box w={"70%"}>
                <Flex flexDirection={"column"} gap={"10px"}>
                  {chatMessages?.map((ele, id) => (
                    <CardContainer
                      border={"1px solid #e2e8f0"}
                      boxShadow={"sm"}
                      borderRadius={"10px"}
                      background={"#F4F4F5"}
                      padding={"15px 20px"}
                      as={false}
                      cursor={"pointer"}
                    >
                      {ele.message.map((msg) => (
                        <Box
                          key={msg._id}
                          onClick={() => handleChatBase(msg?.sessionId)}
                        >
                          <Text
                            fontSize="13px"
                            color={
                              msg.messageType === "USER" ? "gray" : "black"
                            }
                            sx={{
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: "2",
                            }}
                          >
                            {msg.messageType === "USER"
                              ? `Customer: ${msg.message}`
                              : `Bot: ${msg.message}`}
                          </Text>
                        </Box>
                      ))}
                      {ele.message.map((time, index) => (
                        <Text
                          key={index}
                          textAlign="end"
                          color="gray.400"
                          fontSize="12px"
                        >
                          {time.messageType === "AI"
                            ? formatTime(time.createdAt)
                            : null}
                        </Text>
                      ))}
                    </CardContainer>
                  ))}
                </Flex>
              </Box>
              <ChatBase userMessages={userMessages} loading={isLoading} />
            </Flex>
          )}
        </Box>
      </CardContainer>
    </Box>
  );
};

export default Activity;
