import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Flex
      w="100%"
      color="white"
      bg="#575782"
      h="65px"
      p="10px"
      alignItems="center"
      paddingLeft="30px"
      gap="10px"
    >
      <Heading size="md"> ChatBOT </Heading>
    </Flex>
  );
};

export default Header;
