"use client";

import React, { ReactElement, useCallback, useEffect, useState } from "react";
import ChatContainer from "@/components/chat/Container";
import ChatFooter from "@/components/chat/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { SOCKET } from "../../../services/socket";
import axiosInstance from "@/utils/axiosInstance";
import { primaryTheme, secondaryTheme } from "@/theme";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

interface Message {
  type: "AI" | "USER";
  message: string;
  chatSessionId: number | string | null;
  questionType?: string;
  nextType?: string;
  isCustom?: boolean;
  documentId: string;
  label?: string;
  isFormCompleted?: boolean;
}

interface Fields {
  isCustom: any;
  isRequired: boolean;
  label: string;
  name: string;
  type: string;
  value?: string;
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState(primaryTheme);
  const [defaultTheme, setDefaultTheme] = useState<string>("Primary");
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<Fields[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>();

  console.log(isFormCompleted, "response.data.isFormCompleted");

  console.log(inputFields, "inputFieldsinputFields");
  const documentId = params.slug;

  const fetchInputFields = useCallback(async () => {
    try {
      setLoading(true);
      const storedDocumentId = getLocalStorageItem("documentId") || documentId;
      const response = await axiosInstance.get(
        `/user/form-chatbot/?documentId=${storedDocumentId}`
      );
      console.log(response, "gettttt");
      const fields = response?.data?.data?.fields || [];
      console.log(fields, "fieldsss");
      setInputFields(fields);
      setIsFormCompleted(response.data?.isFormCompleted);
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

    const handleConnect = () => {
      console.log(documentId, "Connected to socket with ID:", SOCKET.id);

      if (isFormCompleted !== undefined) {
        const payload: any = {
          type: "AI",
          documentId,
          isFormCompleted,
        };

        console.log("isFormCompleted---", isFormCompleted);

        if (!isFormCompleted) {
          console.log("!----isFormCompleted----", isFormCompleted);
          if (inputFields.length === 0) {
            payload.questionType = "";
            payload.nextType = "";
            setIsFormCompleted(true);
          } else {
            const currentField = inputFields[currentFieldIndex];
            payload.questionType = "HI";
            payload.nextType = currentField?.isCustom
              ? "CUSTOM"
              : currentField?.label.toUpperCase();

            if (currentField?.isCustom) {
              payload.label = currentField?.label;
            }
          }

          console.log("Payload before emitting:", payload);
        }

        SOCKET.emit("search", payload);
      }
    };

    SOCKET.on("connect", handleConnect);

    const handleSearches = (data: any) => {
      setLoading(data.type === "USER");
      console.log("searchData", data, chatMessages);
      setChatSessionId(data?.sessionId);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    SOCKET.on("searches", handleSearches);

    SOCKET.on("error", () => {
      console.error("Socket error:", SOCKET);
    });

    return () => {
      SOCKET.off("connect", handleConnect);
      SOCKET.off("searches", handleSearches);
      SOCKET.disconnect();
    };
  }, [isFormCompleted]);

  const handleSend = (e: React.FormEvent, messageText: string) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    let questionType = "";
    let nextType = "";
    let label = "";
    if (inputFields.length === 0 && currentFieldIndex === 0) {
      questionType = "";
      nextType = "";
      // setIsFormCompleted(true);
    } else if (
      currentFieldIndex > inputFields.length &&
      currentFieldIndex != 0
    ) {
      questionType = "";
      nextType = "";
      // setIsFormCompleted(true);
      console.log("isform", isFormCompleted);
    } else if (currentFieldIndex + 1 === inputFields.length) {
      questionType = "END";
      nextType = "END";
      // setIsFormCompleted(true);
    } else {
      if (inputFields[currentFieldIndex + 1]?.isCustom) {
        questionType = "CUSTOM";
        nextType = "CUSTOM";
        label = inputFields[currentFieldIndex + 1]?.label || "";
      } else {
        const previousIndex = Math.max(0, currentFieldIndex);
        console.log(previousIndex, "prevvvv");
        questionType = inputFields[previousIndex]?.label.toUpperCase() || "";
        console.log(questionType, "ques");
        nextType = inputFields[currentFieldIndex + 1]?.name.toUpperCase() || "";
        console.log(nextType, "nextt");
      }
    }

    // Define the payload
    const payload: any = {
      type: "USER",
      text: messageText,
      documentId,
      chatSessionId,
      // isFormCompleted,
    };

    console.log(payload, "payyyyy");
    if (!isFormCompleted) {
      if (!(inputFields.length === 0 && currentFieldIndex === 0)) {
        if (questionType) payload.questionType = questionType;
        if (nextType) payload.nextType = nextType;
      }
      if (inputFields[currentFieldIndex + 1]?.isCustom && label) {
        payload.label = label;
      }
    }

    // Emit the updated payload to the server
    SOCKET.emit("search", payload);

    // Increment the field index after sending the message
    setCurrentFieldIndex((prevIndex) => prevIndex + 1);

    setLoading(true);
  };

  useEffect(() => {
    fetchInputFields();
    fetchTheme();
  }, [fetchInputFields, fetchTheme]);

  console.log(isFormCompleted, "formrmm");
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
