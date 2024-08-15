"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
import { ChatbotLinkContext } from "../../context/Context";

const InputContext = ({ logoutLoading }: any) => {
  const { inputData, setInputData } = useContext(ChatbotLinkContext);
  console.log(inputData);
  const [isEditId, setIsEditId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [screenLoading, setscreenLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (documentId: any) => {
    try {
      setscreenLoading(true);
      const response = await axiosInstance.get(
        `/user/text${documentId ? `?documentId=${documentId}` : ""}`
      );

      if (response.data) {
        setInputData(response?.data?.text);
        setIsEditId(response?.data?._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setscreenLoading(false);
    }
  }, []);

  useEffect(() => {
    const documentId = getLocalStorageItem("documentId");
    fetchData(documentId);
  }, []);

  const handleAdd = async () => {
    if (!inputData || inputData.length < 250) {
      toast.error("Please enter the text with minimum 250 characters");
      return;
    }
    setLoading(true);

    try {
      const documentId = getLocalStorageItem("documentId");
      const { data } = await axiosInstance.post(`/user/text`, {
        text: inputData,
        ...(documentId && { documentId }),
      });

      if (data) {
        setLocalStorageItem("documentId", data?.data?.documentId);
        toast.success(data?.messgage);
        fetchData(data?.data?.documentId);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!inputData) {
      toast.error("Please Enter the Text");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.patch(`/user/text`, {
        text: inputData,
        _id: isEditId,
      });
      if (data) {
        toast.success(data?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {screenLoading || logoutLoading ? (
        <Box>
          <Flex justifyContent={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        </Box>
      ) : (
        <CardContainer
          width="100%"
          border={"1px solid #e2e8f0"}
          boxShadow={"sm"}
          borderRadius={"10px"}
          padding="20px"
          as={false}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <CardHeader>
              <Heading size="md" textAlign={"start"} pt={"0px!important"}>
                Text
              </Heading>
            </CardHeader>
            <CardContainer
              width="100%"
              border={"none"}
              boxShadow={"none"}
              background={""}
              borderRadius={"none"}
              padding={"15px 20px"}
            >
              <Box>
                <Textarea
                  placeholder="Enter Text"
                  onChange={(e) => setInputData(e.target.value)}
                  height={300}
                  value={inputData}
                />
              </Box>
            </CardContainer>
            <CardFooter>
              <Box>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  gap={"20px"}
                >
                  <Text fontSize={12}>
                    {inputData ? inputData?.length : 0} characters
                  </Text>
                  <Button
                    sx={{ color: "white", backgroundColor: "#5188b9" }}
                    onClick={isEditId ? handleUpdate : handleAdd}
                    isLoading={loading}
                    colorScheme="blue"
                  >
                    {isEditId ? "Update data" : "Add data"}
                  </Button>
                </Flex>
              </Box>
            </CardFooter>
          </Flex>
        </CardContainer>
      )}
    </Box>
  );
};

export default InputContext;
