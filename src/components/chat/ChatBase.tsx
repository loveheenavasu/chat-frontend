import { Box, Flex, Text } from "@chakra-ui/react";

interface Message {
  _id: string;
  message: string;
  messageType: "USER" | "AI";
  createdAt: number;
}

interface ChatBaseProps {
  userMessages: Message[];
  loading: boolean;
}

const ChatBase: React.FC<ChatBaseProps> = ({
  userMessages,
  loading,
}: ChatBaseProps) => {
  return (
    <Box width="100%">
      <Box
        border="1px solid #e2e8f0"
        borderRadius="10px"
        p="5px"
        boxShadow="sm"
      >
        <Box
          style={loading ? { height: "70vh" } : {}}
          height="500px"
          overflow="scroll"
        >
          {loading ? (
            <Box textAlign="center" p="20px">
              loading......
            </Box>
          ) : userMessages.length > 0 ? (
            userMessages.map((ele, index) => (
              <Box key={index}
                width="100%" p="10px"
              >
                <Flex
                  justifyContent={
                    ele.messageType === "AI" ? "flex-start" : "flex-end"
                  }
                >
                  <Text
                    fontSize="14px"
                    background={ele.messageType === "AI" ? "#F4F4F5" : "blue"}
                    borderRadius="7px"
                    p="10px"
                    color={ele.messageType === "AI" ? "black" : "white"}
                  >
                    {ele.message}
                  </Text>
                </Flex>
              </Box>
            ))
          ) : (
            <Box
              textAlign="center"
              p="20px"
              textColor={"gray.500"}
              margin={"auto"}
              h={"-webkit-fill-available"}
            >
              <Flex alignItems={"center"} justifyContent={"center"}>
                Please select a chat to view.
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBase;
