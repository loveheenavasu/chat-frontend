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

const ChatBase = ({ userMessages, loading }: ChatBaseProps) => {
  return (
    <Box width='100%'>
      <Text color='black' fontSize='16px' fontWeight='600' pb='10px'>Source: Chatbase site</Text>
      <Box border='1px solid #e2e8f0' borderRadius='10px' p='5px' boxShadow='sm'>
        <Box
          style={loading ? { height: "70vh" } : {}}
          height='500px'
          overflow='scroll'
        >
          {loading ? (
            <Box textAlign='center' p='20px'>loading......</Box>
          ) : (
            userMessages.length > 0 ? (
              userMessages.map((ele) => (
                <Box key={ele._id} width='100%' p='10px'>
                  <Flex justifyContent={ele.messageType === "AI" ? "flex-start" : "flex-end"}>
                    <Text
                      fontSize='14px'
                      background={ele.messageType === "AI" ? "#F4F4F5" : 'blue'}
                      borderRadius='7px'
                      p='10px'
                      color={ele.messageType === "AI" ? "black" : 'white'}
                    >
                      {ele.message}
                    </Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Box textAlign='center' p='20px'>No messages yet...</Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBase;
