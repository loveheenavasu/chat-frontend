import Activity from "@/components/Activity";
import Layout from "@/components/layout/Layout";
import { Box, Flex } from "@chakra-ui/react";

const page = () => {
  return (
    <Layout>
      <Flex justifyContent="center">
        <Box height="100vh" w="100%">
          <Activity initialChatMessages={[]} loading={false} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default page;
