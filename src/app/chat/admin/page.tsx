"use client";
import AdminHeader from "@/components/AdminHeader";
import AdminSideBar from "@/components/AdminSideBar";
import AdminTextSpace from "@/components/AdminTextSpace";
import FIlesCard from "@/components/FIlesCard";
import WebsiteCard from "@/components/WebsiteCard";
import { Box } from "@chakra-ui/react";
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
        return <Activity loading={loading} />;
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
      <Box
        p="5px"
        border="1px solid #fff"
        w="30%"
        display="flex"
        alignItems="center"
      >
        <Box m="5px" p="20px" display=" flex" alignItems="center" gap={1}>
          <Link href="/">
            {" "}
            <IoMdArrowBack size="30px" />
          </Link>
          Back
        </Box>
      </Box>
      <Box height={"80px"}></Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        className={styles.adminWrapper}
      >
        <Box className={styles.adminLeftWrapper}>
          <AdminSideBar activeButton={activeButton} setActive={setActive} />
        </Box>
        <Box className={styles.adminCenterWrapper}>{renderCards()}</Box>

        <Box className={styles.adminRightWrapper}>
          <SourceCard
            inputData={inputData}
            increaseCounter={increaseCounter}
            activeButton={activeButton}
          />
        </Box>
      </Box>
    </>
  );
};

export default Admin;
