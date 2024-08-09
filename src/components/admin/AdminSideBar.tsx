"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { CiFileOn, CiTextAlignLeft } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";

interface AdminSidebarProps {
  setActiveButton?: any;
  activeButton?: string;
}
const AdminSideBar = ({ setActiveButton, activeButton }: AdminSidebarProps) => {
  const router = useRouter();
  const sourceType = [
    {
      label: "Files",
      icon: <CiFileOn fontSize={25} />,
      path: "/admin/chat/files",
    },
    {
      label: "Text",
      icon: <CiTextAlignLeft fontSize={25} />,
      path: "/admin/chat",
    },
    {
      label: "Activity",
      icon: <LuMessagesSquare fontSize={25} />,
      path: "/admin/chat/activity",
    },
  ];

  const handleClick = (label: string, path: string) => {
    if (setActiveButton) {
      setActiveButton(label);
    }
    router.push(path);
  };

  return (
    <Box w="120px" borderRadius={"5px"}>
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
                <Flex alignItems="center" cursor="pointer" gap="2" p="2">
                  {icon}
                  <Text fontWeight={500}>{label}</Text>
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
