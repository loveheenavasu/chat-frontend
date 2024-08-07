"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiFileOn, CiGlobe, CiTextAlignLeft } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";

interface AdminSidebarProps {
  setActive?: any;
  activeButton?: string;
}
const AdminSideBar = ({ setActive, activeButton }: AdminSidebarProps) => {
  const router = useRouter();
  const sourceType = [
    {
      label: "Files",
      icon: <CiFileOn fontSize={25} />,
      path: "/chat/admin/files",
    },
    {
      label: "Text",
      icon: <CiTextAlignLeft fontSize={25} />,
      path: "/chat/admin",
    },
    {
      label: "Activity",
      icon: <LuMessagesSquare fontSize={25} />,
      path: "/chat/admin/activity",
    },
    // { label: "Website", icon: <CiGlobe fontSize={25} /> },
    // { label: "Q&A", icon: <IoChatbubblesOutline fontSize={25} /> },
  ];

  const handleClick = (label: string, path: string) => {
    if (setActive) {
      setActive(label);
    }
    router.push(path);
  };

  return (
    <Box w={"150px"} borderRadius={"5px"}>
      <Flex flexDirection={"column"} gap={"4px"}>
        {sourceType.map(({ label, icon, path }, index) => {
          return (
            <section>
              <Box
                key={label + index}
                paddingLeft={"10px"}
                borderRadius={"5px"}
                textAlign={"center"}
                style={
                  label === activeButton
                    ? {
                        background: "#f9f9f9",
                        color: "blue",
                      }
                    : {}
                }
                onClick={() => handleClick(label, path)}
              >
                <Flex alignItems="center">
                  {icon}
                  <Box width={"110px"} padding={"5px"}>
                    <Text fontWeight={500}>{label}</Text>
                  </Box>
                </Flex>
              </Box>
            </section>
          );
        })}
      </Flex>
    </Box>
  );
};

export default AdminSideBar;
