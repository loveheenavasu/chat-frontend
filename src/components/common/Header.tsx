"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeLocalStorageItem } from "@/utils/localStorage";
import { MdDarkMode } from "react-icons/md";
interface themeProps {
  bg?: string;
  title?: string;
}

const Header: React.FC<themeProps> = ({ bg, title }) => {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<{
    bg: string;
    color: string;
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const themes = [
    {
      theme: "Primary",
      botMessage: "How can I assist you!",
      customerMessage: "Hello!",
      bg: "bg.300",
      color: "black",
    },
    {
      theme: "Secondary",
      botMessage: "How can I assist you!",
      customerMessage: "Hello!",
      bg: "gray.500",
      color: "#fff",
    },
  ];

  const handleLogout = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const response = await axiosInstance.delete(`user/logout`);
      if (response?.data) {
        Cookies.remove("authToken");
        removeLocalStorageItem();
        router.push("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeSelection = async (item: any, index: number) => {
    try {
      const payload = { theme: item.theme };
      const response = await axiosInstance.post(`/user/theme`, payload);
      if (response.data) {
        setSelectedTheme(item);
        setSelectedIndex(index);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Box>
      <Box w={"100%"} height={"50px"} position="absolute" top="0">
        <Flex alignItems={"center"} height={"50px"}>
          <Box
            w={"100%"}
            bg={pathname.startsWith("/chatbot") ? bg : "#7ab3e7"}
            color={"white"}
            height={"100%"}
            padding={"8px"}
          >
            <Flex alignItems={"center"} gap={"20px"}>
              <Link href="/" _hover={"text-decoration-none"}>
                <Heading
                  fontSize="xl"
                  cursor={"pointer"}
                  fontWeight="bold"
                  color={title ? title : "white"}
                >
                  ChatBOT
                </Heading>
              </Link>
              <Spacer />

              {pathname.startsWith("/chatbot") ? null : (
                <>
                  <Box mr="6">
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      cursor="pointer"
                      onClick={() => router.push("/")}
                    >
                      All ChatBot
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      cursor="pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </Text>
                  </Box>
                  <Box>
                    <Button colorScheme="#575782" onClick={onOpen}>
                      <MdDarkMode size={"20px"} />
                    </Button>
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Select Your Theme</DrawerHeader>
                        <DrawerBody>
                          {themes.map((item, index) => (
                            <Checkbox
                              key={index}
                              isChecked={selectedIndex === index}
                              onChange={() => handleThemeSelection(item, index)}
                            >
                              <Card
                                align="center"
                                background={
                                  item.theme === "Secondary"
                                    ? "gray.500"
                                    : "gray.300"
                                }
                                mb={"20px"}
                                p={"10px"}
                                shadow={"lg"}
                                onClick={() =>
                                  handleThemeSelection(item, index)
                                }
                              >
                                <Box
                                  border={"1px solid gray.500"}
                                  borderRadius={"10px"}
                                  background={
                                    item.theme === "Secondary"
                                      ? "gray.300"
                                      : "#fff"
                                  }
                                >
                                  <CardHeader padding={"10px"}>
                                    <Heading size="lg" color={"black"}>
                                      Title
                                    </Heading>
                                  </CardHeader>
                                  <CardBody>
                                    <Flex gap={"20px"} direction={"column"}>
                                      <Text
                                        backgroundColor={
                                          item.theme === "Secondary"
                                            ? "gray.500"
                                            : "#F4F4F5"
                                        }
                                        color={
                                          item.theme === "Secondary"
                                            ? "#fff"
                                            : "black"
                                        }
                                        p={"5px"}
                                        borderRadius={"10px"}
                                        fontSize={"12px"}
                                        alignSelf={"flex-start"}
                                      >
                                        Bot: {item.botMessage}
                                      </Text>
                                      <Text
                                        backgroundColor={"blue"}
                                        color={"#fff"}
                                        p={"5px"}
                                        borderRadius={"10px"}
                                        fontSize={"12px"}
                                        fontWeight={"500"}
                                        alignSelf={"flex-end"}
                                      >
                                        User: {item.customerMessage}
                                      </Text>
                                    </Flex>
                                  </CardBody>
                                </Box>
                                <CardFooter p={"0"}>
                                  <Text
                                    fontWeight={"600"}
                                    fontSize={22}
                                    color={"white"}
                                  >
                                    {item.theme}
                                  </Text>
                                </CardFooter>
                              </Card>
                            </Checkbox>
                          ))}
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </Box>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
