"use client";

import React, { useCallback, useEffect, useState } from "react";
import ChatContainer from "@/components/chat/Container";
import ChatFooter from "@/components/chat/Footer";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";
import { SOCKET } from "../../../services/socket";
import axiosInstance from "@/utils/axiosInstance";
import { primaryTheme, secondaryTheme } from "@/theme";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
// import { useRouter } from "next/router";
import axios from "axios";
import { usePathname } from "next/navigation";

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

export interface Fields {
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
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<any>({});
  const [themeColorLoading, setThemeColorLoading] = useState<any>({});
  const pathname = usePathname();
  const documentId = pathname.split("/").pop();

  const isFormCompleted = getLocalStorageItem("isFormCompleted");
  const getThemeColors = async () => {
    try {
      setThemeColorLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/theme-detail/${documentId}`
      );
      setThemeColor(response?.data);
      localStorage.setItem("primaryTheme", response?.data?.primaryTheme);
    } catch (error) {
      setThemeColorLoading(false);

      console.error(error, "Error during authentication");
    } finally {
      setThemeColorLoading(false);
    }
  };

  const fetchInputFields = useCallback(async () => {
    try {
      setLoading(true);
      const storedDocumentId = getLocalStorageItem("documentId") || documentId;
      const response = await axiosInstance.get(
        `/user/form-chatbot/?documentId=${storedDocumentId}`
      );
      const fields = response?.data?.data?.fields || [];
      setInputFields(fields);
      setIsFormComplete(false);

      // setIsFormCompleted(response.data?.isFormCompleted);
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
      if (isFormCompleted) {
        const payload: any = {
          type: "AI",
          documentId,
          isFormCompleted,
        };

        let questionType = "";
        let nextType = "";

        if (isFormCompleted === null) {
          if (inputFields?.length > 0) {
            setIsFormComplete(false);
            setLocalStorageItem("isFormCompleted", false);
          }
        }

        if (isFormCompleted === "false") {
          if (inputFields?.length === 0) {
            payload.questionType = questionType;
            payload.nextType = nextType;
            // payload.questionType = "";
            // payload.nextType = "";

            // setIsFormCompleted(true);
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
        }

        SOCKET.emit("search", payload);
      }
      setChatMessages([]);

      // setTimeout(() => {
      //   setIsFormComplete(false);
      //   setLocalStorageItem("isFormCompleted", false);
      //   // removeLocalStorageItem();
      //   location.reload();
      // }, 5 * 60 * 1000);
    };

    SOCKET.on("connect", handleConnect);

    const handleSearches = (data: any) => {
      setLoading(data.type === "USER");
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
  }, [inputFields.length]);
  useEffect(() => {
    getThemeColors();
  }, [documentId]);

  useEffect(() => {
    const storedIsFormCompleted = getLocalStorageItem("isFormCompleted");
    if (storedIsFormCompleted === null) {
      setLocalStorageItem("isFormCompleted", false);
      setIsFormComplete(false);
    } else {
      setIsFormComplete(storedIsFormCompleted === "false");
    }
  }, [isFormComplete]);

  const handleSend = (e: React.FormEvent, messageText: string) => {
    e.preventDefault();
    if (!messageText.trim() || chatMessages?.length < 1) return;

    let questionType = "";
    let nextType = "";
    let label = "";
    if (inputFields.length === 0 && currentFieldIndex === 0) {
      questionType = "";
      nextType = "";
      // setIsFormComplete(true);
      // setLocalStorageItem("isFormCompleted", true);
    } else if (
      currentFieldIndex >= inputFields.length &&
      currentFieldIndex != 0
    ) {
      questionType = "";
      nextType = "";
      // setIsFormCompleted(true);

      setLocalStorageItem("isFormCompleted", true);
    } else if (currentFieldIndex + 1 === inputFields.length) {
      questionType = "END";
      nextType = "END";
      // setIsFormCompleted(true);

      setLocalStorageItem("isFormCompleted", true);
    } else {
      if (inputFields[currentFieldIndex + 1]?.isCustom) {
        questionType = "CUSTOM";
        nextType = "CUSTOM";
        label = inputFields[currentFieldIndex + 1]?.label || "";
      } else {
        const previousIndex = Math.max(0, currentFieldIndex);
        questionType = inputFields[previousIndex]?.label.toUpperCase() || "";
        nextType = inputFields[currentFieldIndex + 1]?.name.toUpperCase() || "";
      }
    }

    // Define the payload
    const payload: any = {
      type: "USER",
      text: messageText,
      documentId,
      chatSessionId,
      // isFormComplete,
    };

    if (isFormCompleted === "false") {
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

    // setLocalStorageItem("isFormCompleted", true);

    setLoading(true);
  };

  useEffect(() => {
    fetchInputFields();
    fetchTheme();
  }, [fetchInputFields, fetchTheme]);

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
    <>
      <Box>
        <Header bg={theme.background} title={theme.title} />
        <ChatContainer
          chatMessages={chatMessages}
          loading={loading}
          bg={theme.innerContainer}
          color={theme.color}
          themeColor={themeColor}
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

        <ChatFooter
          handleSend={handleSend}
          inputFields={inputFields}
          isFormCompleted={isFormCompleted}
          bg={themeColor?.primaryTheme}
          loading={themeColorLoading}
        />
      </Box>
    </>
  );
};

export default Page;
