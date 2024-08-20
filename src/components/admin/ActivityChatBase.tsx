import { Box, Flex, Text } from "@chakra-ui/react";
import CardContainer from "../cardContainer/CardContainer";
import { Message } from "../common/ActivityMessageInterface";

interface ChatBaseProps {
  userMessages: Message[];
  loading: boolean;
}

const ActivityChatBase = ({ userMessages, loading }: ChatBaseProps) => {
  const RenderChatbaseChat = () => {
    if (loading) {
      return (
        <Box textAlign="center" p="20px">
          loading......
        </Box>
      );
    }
    if (userMessages.length > 0) {
      return userMessages.map((ele) => (
        <Box key={ele._id} width="100%" p="10px">
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
      ));
    }

    return (
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
    );
  };
  return (
    <Box width="100%">
      <CardContainer
        border={"1px solid #e2e8f0"}
        boxShadow={"sm"}
        borderRadius="10px"
      >
        <Box
          style={loading ? { height: "70vh" } : {}}
          height="500px"
          overflow="scroll"
        >
          {RenderChatbaseChat()}
        </Box>
      </CardContainer>
    </Box>
  );
};
export default ActivityChatBase;
