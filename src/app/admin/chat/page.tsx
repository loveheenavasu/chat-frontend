"use client";
import AdminTextSpace from "@/components/admin/InputContext";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Main from "@/components/admin/Main";

const page = () => {
  const [inputData, setInputData] = useState("");
  const [increaseCounter, setIncreaseCounter] = useState<number>(0);

  return (
    <>
      <Main inputData={inputData} increaseCounter={increaseCounter}>
        <Flex justifyContent="center">
          <Box height="100vh" w="100%">
            <AdminTextSpace
              inputData={inputData}
              setInputData={setInputData}
              setIncreaseCounter={setIncreaseCounter}
            />
          </Box>
        </Flex>
      </Main>
    </>
  );
};

export default page;
