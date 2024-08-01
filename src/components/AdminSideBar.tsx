"use client";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../app/adminpanel/admin.module.css";
import { CiFileOn, CiGlobe, CiTextAlignLeft } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";


interface AdminSidebarProps {
  setActive?: any;
  activeButton?: string;
}
const AdminSideBar = ({ setActive, activeButton }: AdminSidebarProps) => {
  const sourceType = [
    { label: "Files", icon: <CiFileOn fontSize={25} /> },
    { label: "Text", icon: <CiTextAlignLeft fontSize={25} /> },
    { label: "Activity", icon: <LuMessagesSquare fontSize={25} /> },
    // { label: "Website", icon: <CiGlobe fontSize={25} /> },
    // { label: "Q&A", icon: <IoChatbubblesOutline fontSize={25} /> },
  ];

  const handleClick = (label: string) => {
    setActive(label);
  };

  return (
    <Box className={styles.leftSidebar}>
      {sourceType.map(({ label, icon }, i) => {
        return (
          <section>
            <Box
              className={
                label === activeButton
                  ? styles.activeButton
                  : styles.buttonsWrapper
              }
              onClick={() => handleClick(label)}
            >
              {icon}
              <Box width={"110px"} padding={"5px"}>
                <Text fontWeight={500}>{label}</Text>
              </Box>
            </Box>
          </section>
        );
      })}
    </Box>
  );
};

export default AdminSideBar;
