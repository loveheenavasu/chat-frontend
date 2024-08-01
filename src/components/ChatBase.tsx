import { Box, Text } from "@chakra-ui/react";
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

    return (
        <Box width='100%'>
            <Text color='black' fontSize='14px' fontWeight='600'>Source: Chatbase site</Text>
            <Box border='1px solid #e2e8f0' borderRadius='10px' p='5px'>
                <Box
                    className={` ${loading ? styles.chatLoading : ""}`}
                >

                    {(chatMessage ? chatMessage?.map((ele, id) => (
                        <Box
                            key={id}
                            className={
                                ele?.messageType === "AI"
                                    ? styles.chatContainerAdmin
                                    : styles.chatContainerUser
                            }
                            p='10px'
                        >
                            <Text fontSize='14px'
                                background={ele.messageType === "AI" ? "#F4F4F5" : 'blue'} borderRadius='7px' p='10px'
                                color={ele.messageType === "AI" ? " black" : 'white'}>
                                {ele.messageType === "USER" ? ele.message : ele.message}
                            </Text>
                        </Box>
                    )) : (
                        <Box textAlign='center'>loading......</Box>
                    ))
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default ChatBase;
