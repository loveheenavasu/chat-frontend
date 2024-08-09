"use client";

import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import AdminDataBox from "./AdminDataBox";

const AdminBox:React.FC = () => {
  const [inputData, setInputData] = useState<string>("");

  const handleAdd = async () => {
    const response = await axiosInstance.post(`/user/text`, {
      text: inputData,
    });
    setInputData("");
  };

  return (
    <Box w="50%" height={"100%"} padding={"20px"}>
      <Flex justifyContent={"center"}>
        <Box height={"100%"} padding={"20px"} w={"50%"}>
          <Flex justifyContent={"center"}>
            <Box w={"100%"} height={"50%"}>
              <Flex flexDirection={"column"} gap={"10px"}>
                <Textarea
                  placeholder="Feed data"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  size={"lg"}
                  rows={10}
                />
                <Box w="100%">
                  <Flex justifyContent={"center"}>
                    <Button
                      size="sm"
                      colorScheme="cyan"
                      onClick={handleAdd}
                      color={"white"}
                    >
                      {" "}
                      Add Data
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box width={"50%"} padding={"20px"} height={"100%"}>
          <Flex justifyContent={"center"}>
            <AdminDataBox />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminBox;
