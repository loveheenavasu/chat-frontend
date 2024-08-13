import Activity from "@/components/admin/Activity";
import Main from "@/components/admin/Main";
import { Box, Flex } from "@chakra-ui/react";

const page = () => {
  return (
    <Main>
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <Activity initialChatMessages={[]} loading={false} />
        </Box>
      </Flex>
    </Main>
  );
};

export default page;
