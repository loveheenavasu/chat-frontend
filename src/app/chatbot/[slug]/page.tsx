"use client";

import React, { useCallback, useEffect, useState } from "react";
import ChatContainer from "@/components/chat/Container";
import ChatFooter from "@/components/chat/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { SOCKET } from "../../../services/socket";
import axiosInstance from "@/utils/axiosInstance";
import { primaryTheme, secondaryTheme } from "@/theme";
import { getLocalStorageItem } from "@/utils/localStorage";

interface Message {
  type: "AI" | "USER";
  message: string;
  chatSessionId: number | string | null;
  questionType?: string;
  nextType?: string;
  isCustom?: boolean;
  documentId: string;
  label?: string;
}

interface Fields {
  isCustom: any;
  isRequired: boolean;
  label: string;
  name: string;
  type: string;
  value?: string;
}

const Page = ({ params }: any) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState(primaryTheme);
  const [defaultTheme, setDefaultTheme] = useState<string>("Primary");
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<Fields[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
  const [hasSentInitialMessage, setHasSentInitialMessage] =
    useState<boolean>(false);

  console.log(inputFields, "inputFieldsinputFields");
  const documentId = params.slug;

  const fetchInputFields = useCallback(async () => {
    try {
      setLoading(true);
      const storedDocumentId = getLocalStorageItem("documentId") || documentId;
      const response = await axiosInstance.get(
        `/user/form/?documentId=${storedDocumentId}`
      );
      console.log(response, "gettttt");
      const fields = response?.data?.fields || [];
      console.log(fields, "fieldsss");
      setInputFields(fields);
    } catch (error) {
      console.error("Error fetching input fields:", error);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  const fetchTheme = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/theme`);
      const themeData = response.data?.data?.[0]?.theme || "Primary";
      setDefaultTheme(themeData);
    } catch (error) {
      console.error("Failed to fetch the theme:", error);
    }
  }, []);

  useEffect(() => {
    SOCKET.connect();

    SOCKET.once("connect", () => {
      console.log(documentId, "Connected to socket with ID:", SOCKET.id);

      SOCKET.emit("search", {
        type: "AI",
        text: "Welcome to our Chatbot",
        documentId,
      });
    });

    SOCKET.on("searches", (data) => {
      console.log(data, "searchData");
      setLoading(data.type === "USER");
      setChatSessionId(data?.sessionId);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    SOCKET.on("error", () => {
      console.error("Socket error:", SOCKET);
    });

    return () => {
      SOCKET.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent, messageText: string) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    let questionType = "";
    let nextType = "";
    let label = "";

    if (inputFields.length === 0) {
      questionType = "";
      nextType = "";
    } else if (currentFieldIndex === inputFields.length) {
      questionType = "END";
      nextType = "END";
    } else if (!hasSentInitialMessage) {
      questionType = "HI";
      nextType = inputFields[currentFieldIndex]?.isCustom
        ? "CUSTOM"
        : inputFields[currentFieldIndex]?.label.toLocaleUpperCase() || "";
      if (inputFields[currentFieldIndex]?.isCustom) {
        label = inputFields[currentFieldIndex]?.label || "";
      }
      setHasSentInitialMessage(true);
    } else {
      if (inputFields[currentFieldIndex]?.isCustom) {
        questionType = "CUSTOM";
        nextType = "CUSTOM";
        label = inputFields[currentFieldIndex]?.label || "";
      } else {
        const previousIndex = Math.max(0, currentFieldIndex - 1);
        questionType =
          inputFields[previousIndex]?.label.toLocaleUpperCase() || "";
        nextType =
          inputFields[currentFieldIndex]?.name.toLocaleUpperCase() || "";
      }
    }

    const payload: any = {
      type: "USER",
      text: messageText,
      documentId,
      chatSessionId,
    };

    if (inputFields.length > 0) {
      if (questionType) payload.questionType = questionType;
      if (nextType) payload.nextType = nextType;
    }

    if (inputFields[currentFieldIndex]?.isCustom && label) {
      payload.label = label;
    }

    SOCKET.emit("search", payload);
    setCurrentFieldIndex((prevIndex) => prevIndex + 1);

    setLoading(true);
  };

  console.log(currentFieldIndex, "curreernt");

  useEffect(() => {
    if (defaultTheme === "Primary") {
      setTheme(primaryTheme);
    } else if (defaultTheme === "Secondary") {
      setTheme(secondaryTheme);
    }
  }, [defaultTheme]);

  useEffect(() => {
    fetchInputFields();
    fetchTheme();
  }, [fetchInputFields, fetchTheme]);

  return (
    <Box>
      <Header bg={theme.background} title={theme.title} />
      <ChatContainer
        chatMessages={chatMessages}
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

export default Page;
