"use client";
import { useState } from "react";
import SideBar from "@/components/admin/SideBar";
// import UserData from "@/components/admin/UserData";
import CardContainer from "@/components/cardContainer/CardContainer";
import Header from "@/components/common/Header";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

import { SketchPicker } from "react-color"; // Importing the color picker

import {
  Box,
  Card,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  CardBody,
  CardFooter,
  Heading,
  CardHeader,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ThemeColor from "@/components/cardContainer/ThemeColor";
import axios from "axios";
import { getLocalStorageItem } from "@/utils/localStorage";
const themes = [
  {
    theme: "Primary",
    botMessage: "How can I assist you!",
    customerMessage: "Hello!",
    bg: "bg.300",
    color: "black",
  },
];

const page = () => {
  const [theme, setTheme] = useState("1");
  const [primaryThemeColor, setPrimaryThemeColor] = useState("#cbd5e0");
  const [primaryTextColor, setPrimaryTextColor] = useState("#00000");
  const [secondaryThemeColor, setSecondaryThemeColor] = useState("#0000ff");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#ffffff");
  const handleThemeColor = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      const data = {
        primaryTheme: primaryThemeColor,
        primaryText: primaryTextColor,
        secondaryTheme: secondaryThemeColor,
        secondaryText: secondaryTextColor,
        documentId: getLocalStorageItem("documentId"),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/theme`,
        data,
        {
          headers: {
            token: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("primaryTheme");
      }
    } catch (error) {
      console.error(error, "Error during authentication");
    }
  };

  return (
    <>
      <Header />
      <Box pt="40px" border="1px solid #fff" w="fit-content">
        <Link href="/">
          <Flex
            m="5"
            p="10px"
            alignItems="center"
            cursor="pointer"
            gap="1"
            _hover={{ bg: "blue.50" }}
          >
            <IoMdArrowBack size="24px" /> Back
          </Flex>
        </Link>
      </Box>

      <Flex justifyContent="space-between" px="14" gap="3">
        <Box w="20%">
          <SideBar />
        </Box>

        <CardContainer
          border={"1px solid #e2e8f0"}
          boxShadow={"sm"}
          borderRadius={"10px"}
          width="100%"
          padding="20px"
        >
          <Text as="b" fontSize="24" textAlign="center">
            Select Your Theme Style
          </Text>
          <Grid templateColumns="60% 40%" gap={6} mt={8}>
            <GridItem>
              <RadioGroup defaultValue="1">
                <Stack spacing={5} direction="column">
                  <Box
                    onClick={() => {
                      setTheme("1");
                      setPrimaryThemeColor("#cbd5e0");
                      setPrimaryTextColor("#00000");
                      setSecondaryThemeColor("##0000ff");
                      setSecondaryTextColor("#fdfefe");
                      handleThemeColor();
                    }}
                  >
                    <Radio colorScheme="blue" value="1">
                      <Text fontWeight={600} fontSize={24}>
                        Default
                      </Text>
                    </Radio>
                  </Box>
                  {theme === "1" && (
                    <>
                      <Box mx={4} p={0} display="flex">
                        <Box
                          display={"flex"}
                          gap={12}
                          color="black"
                          rounded="md"
                        >
                          <ThemeColor
                            heading="Primary"
                            themeColor="#cbd5e0"
                            textColor="#000000"
                          />
                          <ThemeColor
                            heading="Secondary"
                            themeColor="#0000ff"
                            textColor="#fdfefe"
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  <Box onClick={() => setTheme("2")}>
                    <Radio colorScheme="blue" value="2">
                      <Text fontWeight={600} fontSize={24}>
                        Custom
                      </Text>
                    </Radio>

                    {theme === "2" && (
                      <Box mx={4} p={0} display="flex">
                        <Box display="flex" gap={12} color="black" rounded="md">
                          {/* Primary Section */}
                          <Box>
                            <Text fontWeight={600} fontSize={20}>
                              Primary
                            </Text>
                            <Text fontWeight={600} mb={2}>
                              Theme Color:
                              <SketchPicker
                                color={primaryThemeColor}
                                onChangeComplete={(color) => {
                                  setPrimaryThemeColor(color.hex);
                                  handleThemeColor();
                                }}
                              />
                            </Text>
                            <Text fontWeight={600} mb={2}>
                              Text Color:
                              <SketchPicker
                                color={primaryTextColor}
                                onChangeComplete={(color) => {
                                  setPrimaryTextColor(color.hex);
                                  handleThemeColor();
                                }}
                              />
                            </Text>
                          </Box>

                          {/* Secondary Section */}
                          <Box>
                            <Text fontWeight={600} fontSize={20} mb={2}>
                              Secondary
                            </Text>
                            <Text fontWeight={600} mb={2}>
                              Theme Color:
                              <SketchPicker
                                color={secondaryThemeColor}
                                onChangeComplete={(color) => {
                                  setSecondaryThemeColor(color.hex);
                                  handleThemeColor();
                                }}
                              />
                            </Text>
                            <Text fontWeight={600} mb={2}>
                              Text Color:
                              <SketchPicker
                                color={secondaryTextColor}
                                onChangeComplete={(color) => {
                                  setSecondaryTextColor(color.hex);
                                  handleThemeColor();
                                }}
                              />
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </RadioGroup>
            </GridItem>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              {themes.map((item, index) => (
                <Card
                  align="center"
                  background={primaryThemeColor}
                  mb={"20px"}
                  p={"10px"}
                  shadow={"lg"}
                  width={"64%"}
                >
                  <Box
                    border={"1px solid gray.500"}
                    borderRadius={"10px"}
                    width="100%"
                    background={
                      item.theme === "Secondary" ? "gray.300" : "#fff"
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
                          backgroundColor={primaryThemeColor}
                          color={primaryTextColor}
                          p={"5px"}
                          borderRadius={"10px"}
                          fontSize={"12px"}
                          alignSelf={"flex-start"}
                        >
                          Bot: {item.botMessage}
                        </Text>
                        <Text
                          backgroundColor={secondaryThemeColor}
                          color={secondaryTextColor}
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
                  <CardFooter p={"0"}></CardFooter>
                </Card>
              ))}
            </Box>
          </Grid>
        </CardContainer>
      </Flex>
    </>
  );
};

export default page;
