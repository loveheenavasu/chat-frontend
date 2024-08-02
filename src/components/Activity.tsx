import { Box, Heading, Text } from "@chakra-ui/react";
import ChatBase from "./ChatBase";
import { useEffect, useState, } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface Message {
    map(arg0: (msg: any, id: any) => import("react").JSX.Element): import("react").ReactNode;
    _id: string,
    message: string,
    messageType: "USER" | "AI",
    createdAt: number,
    sessionId: number

}
interface ChatMessage {
    _Id?: string
    chatID?: number | null;
    message: Message;
}

interface ChatContainerProps {
    initialChatMessages: ChatMessage[];
    loading: boolean;
}

const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
// export const handleChatBase = async (sessionId: number, setIsLoading: any, setUserMessages: any) => {
//     setIsLoading(true);
//     try {
//         const response = await axiosInstance.get(`user/chat?sessionId=${sessionId}`);
//         setUserMessages(response.data?.data?.messages || response.data?.data || []);
//     } catch (error) {
//         console.error("Error fetching user messages:", error);
//     }
//     setIsLoading(false);
// }
const Activity = ({ initialChatMessages, loading }: ChatContainerProps) => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
    const [userMessages, setUserMessages] = useState<Message[]>();
    const [isLoading, setIsLoading] = useState(loading);


    useEffect(() => {
        const fetchChatRecords = async () => {
            const documentId = localStorage.getItem('documentId')
            console.log(documentId, 'gf')
            try {
                const response = await axiosInstance.get(`/user/chat-history?documentId=${documentId ? `${documentId}` : ''}`);
                console.log(response.data, "RESPONSEEE")
                setChatMessages(response.data?.data?.messages || response.data?.data || []);
            } catch (error) {
                console.error("Error fetching chat records:", error);
            }
        };

        fetchChatRecords();
    }, [])
    console.log(chatMessages, 'chatMessages')

    const handleChatBase = async (sessionId: number) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`user/chat?sessionId=${sessionId}`);
            setUserMessages(response.data?.data?.messages || response.data?.data || []);

        } catch (error) {
            console.error("Error fetching user messages:", error);
        }
    }
    console.log(userMessages, 'db3vvf84f')

    return (
        <Box border='1px solid #e2e8f0' borderRadius='10px' p='20px' w='100%'>
            <Box paddingBottom='20px'>
                <Heading fontSize='20px'>Chats Logs</Heading>
            </Box>
            <Box display='flex' gap='20px'>
                <Box display='flex' flexDirection='column' gap='10px' w='70%'>
                    {chatMessages?.map((ele, id) => (
                        <Box
                            key={id}
                            p='15px 20px'
                            border='1px solid #e2e8f0'
                            borderRadius='10px'
                            background='#F4F4F5'
                            style={{ cursor: 'pointer' }}
                        >
                            {ele.message.map((msg, index) => (
                                <Box
                                    key={msg._id}
                                    onClick={() => handleChatBase(msg?.sessionId)}

                                >
                                    <Text color='black' fontSize='13px'
                                        color={msg.messageType === "USER" ? "gray" : "black"}
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: "2",
                                        }}

                                    >
                                        {msg.messageType === "USER" ? `Customer: ${msg.message}` : `Bot: ${msg.message}`}
                                    </Text>
                                </Box>
                            ))}
                            {
                                ele.message ? ele.message.map((time, index) => (
                                    <Text textAlign='end' color='gray.400' fontSize='12px'>
                                        {time.messageType === "AI" ? formatTime(time.createdAt) : null}
                                    </Text>
                                )) : (
                                    null
                                )
                            }
                        </Box>
                    ))}
                </Box>
                <ChatBase chatMessage={userMessages} loading={loading} />
            </Box>
        </Box>
    )
}
export default Activity;