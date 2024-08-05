import { Box, Flex, Text } from "@chakra-ui/react";
import styles from "../app/chatbot/chatbot.module.css";

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
        <Box width='100%' >
            <Text color='black' fontSize='16px' fontWeight='600' pb='10px'>Source: Chatbase site</Text>
            <Box border='1px solid #e2e8f0' borderRadius='10px' p='5px' boxShadow={'sm'} >
                <Box
                    style={loading ? { height: "70vh" } : {}}
                    height='500px'
                    overflow='scroll'
                >
                    {(chatMessage ? chatMessage?.map((ele, id) => (
                        <Box
                            key={id}
                            width={'100%'}
                            p='10px'
                        >
                            <Flex justifyContent={
                                ele.messageType === "AI" ? "flex-start" : "flex-end"
                            } >
                                <Text fontSize='14px'
                                    background={ele.messageType === "AI" ? "#F4F4F5" : 'blue'} borderRadius='7px' p='10px'
                                    color={ele.messageType === "AI" ? " black" : 'white'}>
                                    {ele.messageType === "USER" ? ele.message : ele.message}
                                </Text>
                            </Flex>
                        </Box>
                    )) : (
                        <Box textAlign='center' p='20px'>loading......</Box>
                    ))
                    }
                </Box>
            </Box>
        </Box >
    );
};

export default ChatBase;
