import SideBar from "@/components/admin/SideBar";
import UploadFile from "@/components/admin/UploadFile";
import Header from "@/components/common/Header";

import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const page = () => {
  return (
    <>
      <Header />
      <Box pt="40px" border="1px solid #fff" w="fit-content">
        <Link href="/">
          <Flex
            m="5"
            p="10px"
            alignItems="center"
            cursor="pointer"
            gap="1"
            _hover={{ bg: "blue.50" }}
          >
            <IoMdArrowBack size="24px" /> Back
          </Flex>
        </Link>
      </Box>
      <Flex justifyContent="space-between" px="14" gap="3">
        <Box w="20%">
          <SideBar />
        </Box>
        <Box height="100vh" w="100%">
          <UploadFile />
        </Box>
      </Flex>
    </>
  );
};

export default page;
