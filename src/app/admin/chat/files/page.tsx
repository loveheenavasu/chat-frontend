"use client";
import UploadFile from "@/components/admin/UploadFile";
import Main from "@/components/admin/Main";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const Page = () => {
  const [increaseCounter, setIncreaseCounter] = useState(0);

  return (
    <Main increaseCounter={increaseCounter}>
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <UploadFile setIncreaseCounter={setIncreaseCounter} />
        </Box>
      </Flex>
    </Main>
  );
};

export default Page;
