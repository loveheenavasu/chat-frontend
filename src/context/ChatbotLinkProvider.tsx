"use client";
import React, { useState, ReactNode, FC, useEffect } from "react";
import { ChatbotLinkContext } from "./Context";
import { usePathname } from "next/navigation";

export const ChatbotLinkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputData, setInputData] = useState<string>("");
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<string>("");

  useEffect(() => {
    const currentPath = pathname;
    if (currentPath.includes("/files")) {
      setActiveButton("Files");
    } else if (currentPath.includes("/activity")) {
      setActiveButton("Activity");
    } else if (currentPath.includes("/chatbotLink")) {
      setActiveButton("Chatbot");
    } else {
      setActiveButton("Text");
    }
  }, [pathname]);

  console.log(pathname);

  return (
    <ChatbotLinkContext.Provider
      value={{
        inputData,
        setInputData,
        activeButton,
        setActiveButton,
      }}
    >
      {children}
    </ChatbotLinkContext.Provider>
  );
};
