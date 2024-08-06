"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../app/adminpanel/admin.module.css";
import axiosInstance from "@/utils/axiosInstance";
import { DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

const FIlesCard = () => {
  const [file, setFile] = useState<any>({});
  const [data, setData] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [deleteFileLoading, setDeleteFileLoading] = useState("");
  const [isFileUpload, setIsFileUpload] = useState(false);

  const handleUpload = (file: any) => {
    setFile(file);
  };

  const fetchData = async (documentId: any) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/files${documentId ? `?documentId=${documentId}` : ""}`
      );
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const documentId = getLocalStorageItem("documentId");
    fetchData(documentId);
  }, []);

  const handleDeleteFile = async (id: string, docNo: number) => {
    try {
      const documentId = getLocalStorageItem("documentId");
      const response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/files/?documentId=${documentId}&docNo=${docNo}`
      );
      if (response?.data) {
        toast.success(response?.data?.message);
      }
      setDeleteFileLoading("");
      fetchData(documentId);
    } catch (error) {
      setDeleteFileLoading("");
    }
  };

  const handleUploadFile = async () => {
    try {
      if (!file.name) {
        toast.error("No file selected");
        return;
      }
      setIsFileUpload(true);
      const token = localStorage.getItem("authToken");
      const id = getLocalStorageItem("documentId");

      const formData = new FormData();
      formData.append("file", file as any);
      formData.append("documentId", id as any);

      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/upload`,
        formData
      );
      if (response.data) {
        setLocalStorageItem("documentId", response.data?.data.documentId);
        toast.success(response?.data?.message);
        setFile({});
        fetchData(response.data?.data.documentId);
      }

      setIsFileUpload(false);
    } catch (err) {
      setIsFileUpload(false);
      console.error("Upload failed", err);
    }
  };

  const fileTypes = ["DOC", "PDF", "DOCX", "TXT", "CSV"];

  return (
    <Box>
      <Card width="100%" padding="20px" textAlign="start" border="1px solid #e2e8f0" boxShadow="sm">
        <Flex alignItems={"center"} flexDirection={"column"}>
          <CardHeader>
            <Heading size="md" textAlign={"start"} pt={"0px!important"}>
              Files
            </Heading>
          </CardHeader>

          <CardBody pt={"0px !important"} width={"100%"}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box className="file-uploader-class">
                <FileUploader handleChange={handleUpload} name="file" types={fileTypes} onDrop={handleUpload} />
              </Box>
            </Flex>
          </CardBody>

          <Box justifyContent={"center"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"10px"}>
              <Button
                sx={{ color: "white", backgroundColor: "#5188b9" }}
                colorScheme="blue"
                onClick={handleUploadFile}
                isLoading={isFileUpload}
              >
                Upload file
              </Button>
            </Flex>
          </Box>

          <CardFooter flexDirection={"column"} width={"100%"}>
            <Box>
              {file.name && (
                <>
                  <Text fontWeight={"bold"} textAlign={"center"}>
                    Attached Files
                  </Text>
                  <Text textAlign={"center"} fontWeight={"bold"}>
                    {file?.name}
                  </Text>
                </>
              )}
            </Box>

            <Box>
              {loading ? (
                <Box>
                  <Flex justifyContent={"center"}>
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" />
                  </Flex>
                </Box>
              ) : (
                <>
                  {data?.length > 0 ? (
                    <>
                      <Text fontWeight={"bold"} textAlign={"center"} padding={4}>
                        Already Selected File
                      </Text>
                      <Divider padding={2} />
                      {data.map((item: any) => (
                        <Flex key={item._id} width={"80%"} margin={"auto"} alignItems="center" gap="2" padding={2}>
                          <Box p="2">
                            <Heading size="md">{item.fileName}</Heading>
                          </Box>
                          <Spacer />
                          <ButtonGroup gap="2">
                            <Button
                              colorScheme="blue"
                              isLoading={deleteFileLoading === item?._id}
                              onClick={() => {
                                setDeleteFileLoading(item?._id);
                                handleDeleteFile(item.documentId, item?.docNo);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </ButtonGroup>
                        </Flex>
                      ))}
                    </>
                  ) : (
                    <Text textAlign="center">no data found!</Text>
                  )}
                </>
              )}
            </Box>
          </CardFooter>
        </Flex>
      </Card>
    </Box>
  );
};

export default FIlesCard;
