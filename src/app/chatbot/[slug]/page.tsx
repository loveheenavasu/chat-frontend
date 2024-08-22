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

  const [chatId, setChatId] = useState<string>("");
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);

  const id = params.slug;

  useEffect(() => {
    SOCKET.connect();
    SOCKET.on("connect", () => {
      console.log(SOCKET.id, "socketId");
      setShowModal(true);
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const documentId = "5bb125d4-c1b5-4935-8a62-f889549c43df";
      const response = await axiosInstance.get(
        `/user/form-ip?documentId=${documentId}`
      );
      if (!response.data?.data) {
        setShowModal(false);
        onClose();
      } else {
        setShowModal(true);
        onOpen();
      }
      console.log("fetch", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [onOpen, onClose]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box>
      {showModal === true && (
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
      )}
      <Header />
      <ChatContainer chatMessage={chatMessage} loading={loading} />
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
      <ChatFooter handleSend={handleSend} />
    </Box>
  );
};

export default page;
