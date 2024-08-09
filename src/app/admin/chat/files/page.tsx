"use client";
import FIlesCard from "@/components/FIlesCard";
import Layout from "@/components/layout/Layout";
import { Box, Flex } from "@chakra-ui/react";
import React, { SetStateAction, useState, Dispatch } from "react";

const page = () => {
  const [increaseCounter, setIncreaseCounter] = useState(0);
  return (
    <Layout
      // setIncreaseCounter={setIncreaseCounter}
      increaseCounter={increaseCounter}
    >
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <FIlesCard setIncreaseCounter={setIncreaseCounter} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default page;
