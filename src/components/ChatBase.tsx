import { Box, Flex, Text } from "@chakra-ui/react";

interface Message {
  _id: string;
  message: string;
  messageType: "USER" | "AI";
  createdAt: number;
}

interface ChatBaseProps {
  chatMessage: Message[];
  loading: boolean;
}

const ChatBase = ({ chatMessage, loading }: ChatBaseProps) => {
  // chatMessage[0].id
  // useEffect(() => {
  //     const chat = chatMessage[0]._id
  //     handleChatBase()

  // })
  return (
    <Box width="100%">
      <Text color="black" fontSize="16px" fontWeight="600" pb="10px">
        Source: Chatbase site
      </Text>
      <Box border="1px solid #e2e8f0" borderRadius="10px" p="5px">
        <Box h={loading ? "70vh" : "68.9vh"} overflow="scroll">
          {chatMessage ? (
            chatMessage?.map((ele, id) => (
              <Flex
                key={id}
                justifyContent={
                  ele?.messageType === "AI" ? "flex-start" : "flex-end"
                }
                p="10px"
              >
                <Text
                  fontSize="14px"
                  background={ele.messageType === "AI" ? "#F4F4F5" : "blue"}
                  borderRadius="7px"
                  p="10px"
                  color={ele.messageType === "AI" ? " black" : "white"}
                >
                  {ele.messageType === "USER" ? ele.message : ele.message}
                </Text>
              </Flex>
            ))
          ) : (
            <Box textAlign="center" p="20px">
              loading......
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBase;
