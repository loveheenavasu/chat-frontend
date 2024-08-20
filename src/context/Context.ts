import { createContext } from "react";

export const ChatbotLinkContext = createContext<{
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}>({
  inputData: "",
  setInputData: () => {},
  activeButton: "",
  setActiveButton: () => {},
});
