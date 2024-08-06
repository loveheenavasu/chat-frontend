import Activity from "@/components/Activity";
import FIlesCard from "@/components/FIlesCard";
import Layout from "@/components/Layout";
import { Box, Flex } from "@chakra-ui/react";

const Files = () => {
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

export default Files;
