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
import {
  getLocalStorageItem,
  removeParticularItemFromLocalStorage,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { BiImageAdd } from "react-icons/bi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import CardContainer from "@/components/cardContainer/CardContainer";

interface FileProps {
  name: string;
  type: string;
  size: number;
}

interface DataProps {
  _id: string;
  fileName: string;
  documentId: string;
  docNo: number;
}

const UploadFile = () => {
  const [file, setFile] = useState<FileProps | null>(null);
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleteFileLoading, setDeleteFileLoading] = useState<string>("");
  const [isFileUpload, setIsFileUpload] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState(
    getLocalStorageItem("documentId")
  );

  const handleUpload = useCallback((file: any) => {
    setFile(file);
  }, []);

  const fetchData = useCallback(
    async (documentId: string | null | undefined) => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/files`,
          {
            params: { documentId: documentId || undefined },
          }
        );
        setData(data?.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(documentId);
  }, [documentId]);

  const handleDeleteFile = useCallback(async (id: string, docNo: number) => {
    try {
      const { data } = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/files/?documentId=${documentId}&docNo=${docNo}`
      );
      // if (data.length > 1) {
      //   toast.success(data?.message);
      //   fetchData(documentId);
      // }
      if (data) {
        toast.success(data?.message);
        // removeParticularItemFromLocalStorage(id);
        // setDocumentId(" ");
        setData([]);
        fetchData(documentId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteFileLoading("");
    }
  }, []);

  const handleUploadFile = async () => {
    try {
      if (!file) {
        toast.error("Please Select any file");
        return;
      }
      setIsFileUpload(true);
      const id = getLocalStorageItem("documentId");
      const formData = new FormData();
      formData.append("file", file as any);
      formData.append("documentId", documentId as any);

      const { data } = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/upload`,
        formData
      );

      if (data) {
        const newDocumentId = data?.data.documentId;
        setLocalStorageItem("documentId", newDocumentId);
        toast.success(data?.message);
        setFile(null);
        setDocumentId(newDocumentId);
        fetchData(newDocumentId);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsFileUpload(false);
    }
  };

  const fileTypes = useMemo(() => ["DOC", "PDF", "DOCX", "TXT", "CSV"], []);

  return (
    <Box>
      <CardContainer
        border={"none"}
        boxShadow={"sm"}
        borderRadius={"10px"}
        padding={"20px"}
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
                      cursor="pointer"
                      border={"2px dotted blue"}
                      borderRadius={"7px"}
                      width="100%"
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={"2"}
                    >
                      <BiImageAdd size={"40px"} color="blue" />
                      <Box fontSize={"13px"}>
                        Upload or drag a file right here supported extensions
                        next line
                        <br />
                        {fileTypes?.join(", ")}
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
              {file?.name && (
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
                  {data.length > 0 ? (
                    <>
                      <Text
                        fontWeight={"bold"}
                        textAlign={"center"}
                        padding={4}
                      >
                        Already Selected File
                      </Text>
                      <Divider padding={2} />
                      {data?.map((item: any) => (
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
                                handleDeleteFile(
                                  item.documentId,
                                  item?.docNo
                                );
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </ButtonGroup>
                        </Flex>
                      ))}
                    </>
                  ) : (
                    <Text textAlign="center" textColor={"gray.400"}>
                      {!file?.name ? "no data found!" : null}
                    </Text>
                  )}
                </>
              )}
            </Box>
          </CardFooter>
        </Flex>
      </CardContainer>
    </Box>
  );
};

export default UploadFile;
