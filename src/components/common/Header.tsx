import React from "react";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeLocalStorageItem } from "@/utils/localStorage";

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.delete(`user/logout`);
      if (response?.data) {
        Cookies.remove("authToken");
        removeLocalStorageItem();
        router.push("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const pathname = usePathname();

  return (
    <Box>
      <Box w={"100%"} height={"50px"}>
        <Flex alignItems={"center"} height={"50px"}>
          <Box
            w={"100%"}
            bg={`${pathname.startsWith("/chatbot") ? "#575782" : "#7ab3e7"}`}
            color={"white"}
            height={"100%"}
            padding={"15px"}
          >
            <Flex alignItems={"center"}>
              <Heading fontSize="xl" cursor={"pointer"} fontWeight="bold">
                ChatBOT
              </Heading>
              <Spacer />

              {pathname.startsWith("/chatbot") ? (
                ""
              ) : (
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
