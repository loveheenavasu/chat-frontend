"use client";
import React, { useCallback, useEffect, useState } from "react";
import ChatContainer from "@/components/chat/Container";
import ChatFooter from "@/components/chat/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { SOCKET } from "../../../services/socket";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { UserDataPopUp } from "@/components/admin/UserDataPopUp";
import axiosInstance from "@/utils/axiosInstance";
import { primaryTheme, secondaryTheme } from "@/theme";
import { getLocalStorageItem } from "@/utils/localStorage";

interface Message {
  chatId: number | null;
  type: "AI" | "user" | string;
  message: string;
  chatSessionId: number | null;
}

const page = ({ params }: any) => {
  const [chatMessage, setChatMessage] = useState<Message[]>([
    {
      chatId: null,
      type: "AI",
      message: "Welcome to our Chatbot",
      chatSessionId: null,
    },
  ]);
  //deafult primary theme
  const [theme, setTheme] = useState(primaryTheme);
  const [defaultTheme, setDefaultTheme] = useState();
  const [chatId, setChatId] = useState<string>("");
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("isOpen", isOpen);

  const id = params.slug;

  useEffect(() => {
    SOCKET.connect();
    SOCKET.on("connect", () => {
      console.log(SOCKET.id, "socketId");
      onOpen();
    });
    SOCKET.on("searches", (data) => {
      if (data.type === "USER") {
        setLoading(true);
      } else {
        setLoading(false);
      }
      setChatId(data?.chatId);
      setChatSessionId(data?.sessionId);
      setChatMessage((prev) => [...prev, data]);
    });
    SOCKET.on("hi", (e) => console.log(e, "EVENT", SOCKET.id));
    SOCKET.on("error", () => {
      console.log(SOCKET, "Socket");
    });

    return () => {
      SOCKET.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent, message: string) => {
    if (message === "" || message.trim() === "") {
      return null;
    }

    e.preventDefault();
    SOCKET.emit("search", {
      text: message,
      documentId: id,
      ...(chatSessionId && { chatSessionId }),
    });
  };
  console.log(chatMessage);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const documentId = getLocalStorageItem("documentId");
      const res = await axiosInstance.get(
        `/user/form-ip?documentId=${documentId}`
      );
      console.log("fetchData", res.data);

      if (res?.data?.data) {
        console.log("data is present and i want to otpne the modal ");
        onOpen();
      } else {
        console.log("data is not present and i want to close the modal ");
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axiosInstance.get(`/user/theme`);
        console.log(response, "db4bu44");
        setDefaultTheme(response.data.data[0].theme);
        console.log(response.data.data[10].theme, "cici4c");
      } catch (error) {
        console.error("Failed to fetch the theme:", error);
      }
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    if (defaultTheme === "Primary") {
      setTheme(primaryTheme);
    } else if (defaultTheme === "Secondary") {
      setTheme(secondaryTheme);
    }
  }, [defaultTheme]);

  console.log(defaultTheme, "defaultTheme");
  console.log(theme.background, "edejd");

  return (
    <Box>
      <Modal
        onClose={onClose}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent w="100%" textAlign="center" h="70vh" p="5">
          <ModalHeader> User Information </ModalHeader>
          <ModalBody overflow="scroll">
            <UserDataPopUp onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Header bg={theme.background} title={theme.title} />
      <ChatContainer
        chatMessage={chatMessage}
        loading={loading}
        bg={theme.innerContainer}
        color={theme.color}
      />
      {loading && (
        <Box bg="#e9e9ff">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="70"
            height="70"
            preserveAspectRatio="xMidYMid"
            fill="yellow"
          >
            <circle cx="30" cy="50" r="5" fill="#1e90ff">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="50" cy="50" r="5" fill="#3cb371">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="-0.75s"
              />
            </circle>
            <circle cx="70" cy="50" r="5" fill="#ff6347">
              <animate
                attributeName="cx"
                values="30;70;30"
                dur="1.5s"
                repeatCount="indefinite"
                begin="-0.5s"
              />
            </circle>
          </svg>
        </Box>
      )}
      <ChatFooter handleSend={handleSend} bg={theme.background} />
    </Box>
  );
};
export default page;
