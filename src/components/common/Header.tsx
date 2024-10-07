"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";
interface themeProps {
  bg?: string;
  title?: string;
}

const Header: React.FC<themeProps> = ({ bg, title }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("");

  const pathname = usePathname();
  useEffect(() => {
    const theme = getLocalStorageItem("primaryTheme") as string;
    setThemeColor(theme);
  }, []);
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

  
  return (
    <Box>
      <Box w={"100%"} height={"50px"} position="absolute" top="0">
        <Flex alignItems={"center"} height={"50px"}>
          <Box
            w={"100%"}
            bgColor={
              themeColor !== "undefined" && pathname.startsWith("/chatbot")
                ? themeColor
                : "#cbd5e0"
            }
            color={"white"}
            height={"100%"}
            padding={"8px"}
          >
            <Flex alignItems={"center"} gap={"20px"}>
              <Link
                href={!pathname.startsWith("/chatbot") ? "/" : undefined}
                _hover={{ textDecoration: "none" }}
              >
                <Heading
                  fontSize="xl"
                  cursor="pointer"
                  fontWeight="bold"
                  color={title || "white"}
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
