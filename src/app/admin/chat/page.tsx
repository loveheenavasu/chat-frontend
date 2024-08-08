"use client";
import AdminTextSpace from "@/components/AdminTextSpace";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState<string>("");
  const [increaseCounter, setIncreaseCounter] = useState(0);
  if (loading) {
    return;
  }

  return (
    <>
      <Layout inputData={inputData} increaseCounter={increaseCounter}>
        <Flex justifyContent="center">
          <Box height="100vh" w="100%">
            <AdminTextSpace
              inputData={inputData}
              setInputData={setInputData}
              setIncreaseCounter={setIncreaseCounter}
            />
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default page;
