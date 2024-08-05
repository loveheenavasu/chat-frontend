"use client";
import AdminHeader from "@/components/AdminHeader";
import AdminSideBar from "@/components/AdminSideBar";
import AdminTextSpace from "@/components/AdminTextSpace";
import FIlesCard from "@/components/FIlesCard";
import WebsiteCard from "@/components/WebsiteCard";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../../chat/admin/admin.module.css";
import SourceCard from "@/components/SourceCard";
import Activity from "@/components/Activity";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

const Admin = () => {
  const [activeButton, setActive] = useState<string>("Text");
  const [inputData, setInputData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [increaseCounter, setIncreaseCounter] = useState(0);

  const renderCards = () => {
    switch (activeButton) {
      case "Website":
        return <WebsiteCard />;
      case "Files":
        return <FIlesCard />;
      case "Activity":
        return <Activity initialChatMessages={[]} loading={false} />;
      default:
        return (
          <AdminTextSpace
            inputData={inputData}
            setInputData={setInputData}
            logoutLoading={loading}
            setIncreaseCounter={setIncreaseCounter}
          />
        );
    }
  };
  if (loading) {
    return;
  }

  return (
    <>
      <AdminHeader />
      <Box p='5px' border='1px solid #fff' w='30%'>
        <Flex>
          <Box m='5px' p='20px'>
            <Link href='/' > <IoMdArrowBack size='30px' /></Link>
            Back
          </Box>
        </Flex>
      </Box>
      <Box height={"80px"}></Box>
      <Box>
        <Flex justifyContent={"space-between"}>
          <Box paddingLeft='85px' width='20%' height='100vh'>

            <AdminSideBar activeButton={activeButton} setActive={setActive} />
          </Box>
          <Box width='55%' height='100vh'>{renderCards()}</Box>

          <Box padding='30px'
            padding-top='0px !important'
            width='30%' height='100vh'
          >
            <SourceCard
              inputData={inputData}
              increaseCounter={increaseCounter}
              activeButton={activeButton}
            />
          </Box>
        </Flex>
      </Box >
    </>
  );
};

export default Admin;
