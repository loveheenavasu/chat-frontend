import { setLocalStorageItem } from "@/utils/localStorage";
import { ViewIcon } from "@chakra-ui/icons";

import { Button, Card, CardFooter, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { DeleteChatbotPopUp } from "../admin/DeleteChatbotPopUp";

export default function ChatBoxList({ item, refetch }: any) {
  const router = useRouter();
  const { textId } = item || {};

  return (
    <Card maxW="xs" cursor={"pointer"}>
      <Image objectFit="cover" src="/images/chatAi.jpg" alt="Chakra UI" />
      <Text as="b" p="2" fontSize="sm" isTruncated>
        {textId?.type === "TEXT" ? textId?.text : textId?.fileName}
      </Text>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        p={1}
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          padding={1}
        >
          <Button
            flex="1"
            colorScheme="gray"
            variant="ghost"
            onClick={() => {
              setLocalStorageItem("documentId", item?.documentId);
              router.push("/admin/chat");
            }}
            leftIcon={<ViewIcon color={"#4299E1"} />}
          >
            View
          </Button>

          <DeleteChatbotPopUp refetch={refetch} item={item} />
        </Flex>
      </CardFooter>
    </Card>
  );
}
