import axiosInstance from "@/utils/axiosInstance";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface DeleteChatbotPopUpProps {
  item: any;
  refetch: () => void;
}

const DeleteChatbotPopUp: React.FC<DeleteChatbotPopUpProps> = ({
  refetch,
  item,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(
        `/user/chatbot?documentId=${item?.documentId}`
      );
      if (response.data) {
        toast.success(response.data.message);
        refetch();
      }

      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="none"
        onClick={onOpen}
        leftIcon={<DeleteIcon color={"red"} />}
        colorScheme="gray"
      >
        REMOVE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />

        <ModalContent
          justifyContent="start"
          alignItems="start"
          display="flex"
          h="72"
          mx={{ base: 4, sm: 0 }}
          py="8"
        >
          <ModalCloseButton />
          <ModalHeader>Remove Item</ModalHeader>

          <ModalBody color="gray.400" fontWeight={600} fontSize={20}>
            Are you sure you want to remove this item?
          </ModalBody>

          <ModalFooter w="100%" pb="6">
            <Button
              onClick={handleDelete}
              variant="outline"
              _hover={{ bg: "#3360f2" }}
              px="6"
              py="8"
              w="100%"
              rounded={""}
              fontWeight={800}
              bg="#2370f4"
              color="white"
              isLoading={deleteLoading}
            >
              REMOVE
            </Button>
            <Button
              variant="outline"
              _hover={{ color: "#2370f4" }}
              color="black"
              px="6"
              py="8"
              w="100%"
              onClick={onClose}
              rounded={""}
              fontWeight={800}
            >
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { DeleteChatbotPopUp };
