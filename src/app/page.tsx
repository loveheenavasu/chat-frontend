"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/common/Header";
import ListingAllChabot from "@/components/admin/ListingAllChatbot";
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
import {
  getLocalStorageItem,
  removeParticularItemFromLocalStorage,
} from "@/utils/localStorage";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/chatbot`);
      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateChatbot = () => {
    removeParticularItemFromLocalStorage("documentId");
    router.push("/admin/chat");
  };
  return (
    <>
      <Header />
      <Box width="70%" margin="auto">
        <Flex
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          pt="20"
        >
          <Text fontWeight="bold" fontSize={32}>
            Chatbots
          </Text>
          <Spacer />

          <Button colorScheme="blue" onClick={handleCreateChatbot}>
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
                  <ListingAllChabot item={item} refetch={fetchData} />
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
};

export default Home;
