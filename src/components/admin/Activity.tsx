"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ActivityChatBase from "./ActivityChatBase";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CardContainer from "@/components/cardContainer/CardContainer";
import { Message } from "../common/ActivityMessageInterface";
import { PiExport } from "react-icons/pi";
import { getLocalStorageItem } from "@/utils/localStorage";


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
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const [screenLoading, setscreenLoading] = useState<boolean>(false);
  const [_loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const handleDateChange = async(date: any) => {
  //   const { startDate, endDate } = date;

  //   if(startDate && endDate ){
  //        try {
  //          setLoading(true);

  //          const response = await axiosInstance.get(
  //            `/user/chat-history-export?documentId=${documentId}&exportFile=${format}`
  //          );
  //          console.log(response, "2342423234234");
  //          window.open(
  //            `${process.env.NEXT_PUBLIC_BASE_URL}/user/chat-history-export?documentId=${documentId}&exportFile=${format}`,
  //            "_blank"
  //          );
  //          setLoading(false);
  //        } catch (error) {
  //          console.error("Error fetching chat records:", error);
  //          setLoading(false);
  //        }

  //   }
  // };
  const handleChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getDataFormat = async (format: string) => {
    const documentId = getLocalStorageItem("documentId");
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/user/chat-history-export?documentId=${documentId}&exportFile=${format}`
      );
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/chat-history-export?documentId=${documentId}&exportFile=${format}`,
        "_blank"
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat records:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchChatRecords = async () => {
      const documentId = localStorage.getItem("documentId");
      try {
        setscreenLoading(true);
        const { data } = await axiosInstance.get(`/user/chat-history`, {
          params: { documentId: documentId || undefined },
        });
        setChatMessages(data?.data?.messages || data?.data || []);
      } catch (error) {
        console.error("Error fetching chat records:", error);
      } finally {
        setscreenLoading(false);
      }
    };

    fetchChatRecords();
  }, []);

  const handleChatBase = useCallback(async (sessionId: number) => {
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
  }, []);

  const RenderChatMessages = () => {
    return chatMessages?.map((ele) => (
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
          <Box key={msg._id} onClick={() => handleChatBase(msg?.sessionId)}>
            <Text
              fontSize="13px"
              color={msg.messageType === "USER" ? "gray" : "black"}
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
        {ele.message.map((time, index) =>
          index === 0 ? (
            <Text key={index} textAlign="end" color="gray.400" fontSize="12px">
              {formatTime(time.createdAt)}
            </Text>
          ) : null
        )}
      </CardContainer>
    ));
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
            <>
              <Flex justifyContent="space-between" paddingBottom="20px">
                <Heading fontSize="20px">Chats Logs </Heading>
                <Box display="flex" gap={4}>
               
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={_loading ? <Spinner /> : <PiExport />}
                    >
                      Export
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => getDataFormat("JSON")}>
                        JSON
                      </MenuItem>
                      <MenuItem onClick={() => getDataFormat("PDF")}>
                        PDF
                      </MenuItem>
                      <MenuItem onClick={() => getDataFormat("CSV")}>
                        CSV
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>

              {chatMessages.length < 1 ? (
                <Flex justifyContent="center" alignItems="center" my="4">
                  No chats to display. You will receive chats when a user starts
                  the conversation.
                </Flex>
              ) : (
                <Flex gap="20px">
                  <Box w={"70%"} overflow="scroll" height="500">
                    <Flex flexDirection={"column"} gap={"10px"}>
                      {RenderChatMessages()}
                    </Flex>
                  </Box>
                  <ActivityChatBase
                    userMessages={userMessages}
                    loading={isLoading}
                  />
                </Flex>
              )}
            </>
          )}
        </Box>
      </CardContainer>
    </Box>
  );
};

export default Activity;
