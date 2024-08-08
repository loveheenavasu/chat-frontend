"use client";
import FIlesCard from "@/components/FIlesCard";
import Layout from "@/components/Layout";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Files = () => {
  const [increaseCounter, setIncreaseCounter] = useState(0);
  return (
    <Layout increaseCounter={increaseCounter}>
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <FIlesCard setIncreaseCounter={setIncreaseCounter} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Files;
