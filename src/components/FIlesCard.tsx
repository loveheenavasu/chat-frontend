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
import axiosInstance from "@/utils/axiosInstance";
import { DeleteIcon } from "@chakra-ui/icons";
import { FileUploader } from "react-drag-drop-files";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { BiImageAdd } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FIlesCard = ({ setIncreaseCounter }: any) => {
  const [file, setFile] = useState<any>({});
  const [data, setData] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [deleteFileLoading, setDeleteFileLoading] = useState("");
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [documentId, setDocumentId] = useState(
    getLocalStorageItem("documentId")
  ); // Add state for document ID

  const handleUpload = (file: any) => {
    setFile(file);
  };

  const fetchData = async (documentId: any) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/files${
          documentId ? `?documentId=${documentId}` : ""
        }`
      );
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(documentId);
  }, [documentId]); // Add documentId as dependency

  const handleDeleteFile = async (id: string, docNo: number) => {
    try {
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
      const id = getLocalStorageItem("documentId");
      const formData = new FormData();
      formData.append("file", file as any);
      formData.append("documentId", documentId as any);

      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/upload`,
        formData
      );
      if (response.data) {
        const newDocumentId = response.data?.data.documentId;
        setLocalStorageItem("documentId", newDocumentId);
        toast.success(response?.data?.message);
        setFile({});
        setDocumentId(newDocumentId); // Update document ID state
        fetchData(newDocumentId);
      }
      setIsFileUpload(false);
      setIncreaseCounter((prev: any) => prev + 1);
    } catch (err) {
      setIsFileUpload(false);
      console.error("Upload failed", err);
    }
  };

  const fileTypes = ["DOC", "PDF", "DOCX", "TXT", "CSV"];

  return (
    <Box>
      <Card
        width="100%"
        padding="20px"
        textAlign="start"
        border="1px solid #e2e8f0"
        boxShadow="sm"
      >
        <Flex alignItems={"center"} flexDirection={"column"}>
          <CardHeader>
            <Heading size="md" textAlign={"start"} pt={"0px!important"}>
              Files
            </Heading>
          </CardHeader>

          <CardBody pt={"0px !important"} width={"100%"}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box className="file-uploader-class">
                <FileUploader
                  handleChange={handleUpload}
                  name="file"
                  children={
                    <Box
                      border={"2px dotted blue"}
                      borderRadius={"7px"}
                      width="100%"
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={"2"}
                    >
                      <BiImageAdd size={"40px"} color="blue" cursor="pointer" />
                      <Box fontSize={"13px"}>
                        Upload or drag a file right here Supported extensions
                        next line
                        <br />
                        {fileTypes.join(", ")}
                      </Box>
                    </Box>
                  }
                  types={fileTypes}
                  onDrop={handleUpload}
                />
              </Box>
            </Flex>
          </CardBody>

          <Box justifyContent={"center"} alignItems={"center"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={"10px"}
            >
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
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="md"
                    />
                  </Flex>
                </Box>
              ) : (
                <>
                  {data?.length > 0 ? (
                    <>
                      <Text
                        fontWeight={"bold"}
                        textAlign={"center"}
                        padding={4}
                      >
                        Already Selected File
                      </Text>
                      <Divider padding={2} />
                      {data.map((item: any) => (
                        <Flex
                          key={item._id}
                          width={"80%"}
                          margin={"auto"}
                          alignItems="center"
                          gap="2"
                          padding={2}
                        >
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
                    <Text textAlign="center">
                      {!file.name ? "no data found!" : ""}
                    </Text>
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
