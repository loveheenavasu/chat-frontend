"use client";
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import AdminSideBar from "@/components/AdminSideBar";
import SourceCard from "@/components/SourceCard";
import { Box, Flex } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ inputData, increaseCounter, children }: any) => {
  const pathname = usePathname();
  const [activeButton, setActive] = useState<string>("");

  useEffect(() => {
    const currentPath = pathname;
    if (currentPath.includes("/files")) {
      setActive("Files");
    } else if (currentPath.includes("/activity")) {
      setActive("Activity");
    } else {
      setActive("Text");
    }
  }, [pathname]);

  return (
    <>
      <AdminHeader />
      <Box p="5px" border="1px solid #fff" w="30%">
        <Flex m="5" p="20px" alignItems="center">
          <Link href="/">
            <IoMdArrowBack size="30px" />
          </Link>
          Back
        </Flex>
      </Box>
      <Box w="100%">
        <Flex justifyContent={"space-between"}>
          <Box paddingLeft="85px" width="20%" height="100vh">
            <AdminSideBar activeButton={activeButton} setActive={setActive} />
          </Box>
          <Box width="55%" height="100vh">
            {children}
          </Box>
          <Box padding="30px" width="30%" height="100vh">
            <SourceCard
              inputData={inputData}
              increaseCounter={increaseCounter}
              activeButton={activeButton}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
