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
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

const AdminTextSpace: React.FC = ({
  inputData,
  setInputData,
  logoutLoading,
  setIncreaseCounter,
}: any) => {
  const [isEditId, setIsEditId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [screenLoading, setscreenLoading] = useState<boolean>(false);

  const fetchData = async (documentId: any) => {
    try {
      setscreenLoading(true);
      const response = await axiosInstance.get(
        `/user/text${documentId ? `?documentId=${documentId}` : ""}`
      );

      if (response.data) {
        setInputData(response?.data?.text);
        setIsEditId(response?.data?._id);
      }
      setscreenLoading(false);
    } catch (error) {
      setscreenLoading(false);
    }
  };

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
      const response = await axiosInstance.post(`/user/text`, {
        text: inputData,
        ...(documentId && { documentId }),
      });
      console.log(response);

      if (response?.data) {
        setLocalStorageItem("documentId", response?.data?.data?.documentId);
        toast.success(response?.data?.messgage);
        fetchData(response.data?.data?.documentId);
      }
      setLoading(false);
      setIncreaseCounter((prev: number) => prev + 1);
    } catch (error) {
      console.error("Error adding data:", error);
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
      const response = await axiosInstance.patch(`/user/text`, {
        text: inputData,
        _id: isEditId,
      });
      if (response?.data) {
        toast.success(response?.data?.message);
        setIncreaseCounter((prev: any) => prev + 1);
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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
        <Card
          width="100%"
          padding="20px"
          textAlign="start"
          border="1px solid #e2e8f0"
          boxShadow={"sm"}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <CardHeader>
              <Heading size="md" textAlign={"start"} pt={"0px!important"}>
                Text
              </Heading>
            </CardHeader>
            <CardBody pt={"0px !important"} width={"100%"}>
              <Box>
                <Textarea
                  placeholder="Enter Text"
                  onChange={(e) => setInputData(e.target.value)}
                  height={300}
                  value={inputData}
                />
              </Box>
            </CardBody>
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
        </Card>
      )}
    </Box>
  );
};

export default AdminTextSpace;
