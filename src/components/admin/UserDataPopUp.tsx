import axiosInstance from "@/utils/axiosInstance";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Fields {
  isRequired: boolean;
  label: string;
  name: string;
  type: string;
  value?: string;
}

export const UserDataPopUp = ({ onClose }: any) => {
  const [inputFields, setInputFields] = useState<Fields[]>([]);
  console.log(inputFields, "inputFieldsinputFields");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const documentId = getLocalStorageItem("documentId");
      const { data } = await axiosInstance.get(
        `/user/form-ip?documentId=${documentId}`
      );
      console.log("fetch", data);
      if (data) {
        setInputFields(data?.data?.fields);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputFields((prevFields) =>
      prevFields.map((field) =>
        field.name === name ? { ...field, value } : field
      )
    );
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setLoading(true);
      try {
        const documentId = getLocalStorageItem("documentId");
        const formattedData = inputFields.map((field) => ({
          name: field.name,
          ...(field.value && { value: field.value }),
          type: field.type,
          label: field.label,
        }));
        const payload = {
          ...(documentId && { documentId }),
          fields: formattedData,
        };

        const { data } = await axiosInstance.post(`/user/form-info`, payload);
        console.log("user submit", data);
        if (data) {
          toast.success(data.message);
          onClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [inputFields, onClose]
  );

  const renderInputField = (item: Fields) => {
    switch (item.type) {
      case "textarea":
        return (
          <Textarea
            w="100%"
            name={item.name}
            required={item.isRequired}
            onChange={handleChange}
            minH="20"
            borderColor="black"
            _hover={{}}
            value={item.value || ""}
          />
        );
      default:
        return (
          <Input
            w="100%"
            name={item.name}
            required={item.isRequired}
            type={item.type}
            onChange={handleChange}
            borderColor="black"
            _hover={{}}
            value={item.value || ""}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputFields?.map((item) => (
        <Flex
          justifyContent="start"
          alignItems="center"
          gap="5"
          key={item.name}
          mb="4"
        >
          <Flex w="25%">
            <Text as="b">{item.label} </Text>
            {item.isRequired && <Text color="red">*</Text>} :
          </Flex>
          {renderInputField(item)}
        </Flex>
      ))}
      <Button type="submit" colorScheme="blue" my="4" isLoading={loading}>
        Submit
      </Button>
    </form>
  );
};
