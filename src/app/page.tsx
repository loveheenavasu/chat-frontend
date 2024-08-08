"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import ChatBoxList from "@/components/chat/ChatBoxList";
import axiosInstance from "@/utils/axiosInstance";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  Image,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { removeParticularItemFromLocalStorage } from "@/utils/localStorage";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/chatbot`);
      if (response.data) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Box width="70%" margin="auto">
        <Flex
          display={"flex"}
          justifyContent="start"
          alignItems="center"
          width={"100%"}
          py="5"
        >
          <Text fontWeight="bold" fontSize={32}>
            Chatbots
          </Text>
          <Spacer />

          <Button
            colorScheme="blue"
            onClick={() => {
              removeParticularItemFromLocalStorage("documentId");
              router.push("/admin/chat");
            }}
          >
            Create Chatbot
          </Button>
        </Flex>

        {loading ? (
          <Flex justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
          </Flex>
        ) : (
          <React.Fragment>
            {data?.length > 0 ? (
              <Grid templateColumns="repeat(4, 1fr)" gap={6} py="4">
                {data.map((item) => (
                  <ChatBoxList item={item} refetch={fetchData} />
                ))}
              </Grid>
            ) : (
              <Card boxShadow="none" width="60%" margin="auto">
                <CardBody>
                  <Image
                    objectFit="cover"
                    src="/images/chatAi.jpg"
                    alt="Chakra UI"
                  />
                  <Flex justifyContent="center" flexDirection="column">
                    <Center as="b" color="#4299E1" fontSize="2xl" p={1}>
                      No Chatbot has been added yet.
                    </Center>
                    <Center
                      as="b"
                      color="#68D391"
                      fontSize="xl"
                      p={1}
                      textAlign="center"
                    >
                      Add New Chatbot by clicking on create chatbot
                    </Center>
                  </Flex>
                </CardBody>
              </Card>
            )}
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
