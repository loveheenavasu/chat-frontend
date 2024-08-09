"use client";
import FilesCard from "@/components/FIlesCard";
import Layout from "@/components/layout/Layout";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const Page = () => {
  const [increaseCounter, setIncreaseCounter] = useState(0);

  return (
    <Layout increaseCounter={increaseCounter}>
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <FilesCard setIncreaseCounter={setIncreaseCounter} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Page;
