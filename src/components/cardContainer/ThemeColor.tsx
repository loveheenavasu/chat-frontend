import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function ThemeColor({ heading, themeColor, textColor }: any) {
  return (
    <Box>
      <Text fontWeight={600} fontSize={20} mb={1}>
        {heading}
      </Text>
      <Text fontWeight={600} display="flex" alignItems={"center"}>
        {" "}
        Theme Color:{" "}
        <Box
          height={6}
          width={6}
          bg={themeColor}
          borderRadius={"50%"}
          margin={4}
        ></Box>
        {themeColor}
      </Text>
      <Text fontWeight={600} display="flex" alignItems={"center"}>
        Text Color:
        <Box
          height={6}
          width={6}
          bg={textColor}
          borderRadius={"50%"}
          margin={4}
        ></Box>
        {textColor}
      </Text>
    </Box>
  );
}
