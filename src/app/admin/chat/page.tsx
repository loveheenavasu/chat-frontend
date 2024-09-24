"use client";
import InputContext from "@/components/admin/InputContext";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Header from "@/components/common/Header";
import SideBar from "@/components/admin/SideBar";

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

      <Flex
        width="100%"
        height="100vh"
        gap="3"
        justifyContent="space-between"
        px="14"
      >
        <Box w="20% ">
          <SideBar />
        </Box>
        <Box w="100%">
          <InputContext />
        </Box>
      </Flex>
    </>
  );
};

export default page;
