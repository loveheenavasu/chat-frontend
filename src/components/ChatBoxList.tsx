import axiosInstance from "@/utils/axiosInstance";
import { setLocalStorageItem } from "@/utils/localStorage";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteChatbotPopUp } from "./DeleteChatbotPopUp";

export default function ChatBoxList({ item, refetch }: any) {
  // const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const { textId } = item || {};
  // const handleDelete = async () => {
  //   try {
  //     setDeleteLoading(true);
  //     const response = await axiosInstance.delete(
  //       `/user/chatbot?documentId=${item?.documentId}`
  //     );
  //     if (response.data) {
  //       toast.success(response.data.message);
  //       refetch();
  //     }

  //     setDeleteLoading(false);
  //   } catch (error) {
  //     setDeleteLoading(false);
  //   }
  // };
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
          {/* <ViewIcon
            onClick={() => {
              setLocalStorageItem("documentId", item?.documentId);
              router.push("/chat/admin");
            }}
          />

          <Button
            variant="ghost"
            onClick={handleDelete}
            isLoading={deleteLoading}
          >
            <DeleteIcon color={"red"} />
          </Button> */}
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

          {/* <Button
            flex="1"
            colorScheme="gray"
            variant="ghost"
            onClick={handleDelete}
            isLoading={deleteLoading}
            leftIcon={<DeleteIcon color={"red"} />}
          >
            Delete
          </Button> */}

          <DeleteChatbotPopUp refetch={refetch} item={item} />
        </Flex>
      </CardFooter>
    </Card>
  );
}
