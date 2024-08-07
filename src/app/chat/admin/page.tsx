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
import Layout from "@/components/Layout";

const Admin = () => {
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

export default Admin;
