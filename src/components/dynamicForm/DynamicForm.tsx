"use client";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";
import axiosInstance from "@/utils/axiosInstance";
import { getLocalStorageItem } from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
import { toast } from "react-toastify";

interface FormFields {
  type: string | number;
  name: string;
  label: string;
  isRequired: boolean;
  isCustom: boolean;
}

const DynamicForm = () => {
  const [fields, setFields] = useState<FormFields[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);

  const addField = () => {
    setFields([
      ...fields,
      {
        type: "text",
        name: "",
        label: "",
        isRequired: false,
        isCustom: true,
      },
    ]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = fields.map((field, i) =>
      i === index
        ? { ...field, [event.target.name]: event.target.value }
        : field
    );
    setFields(updatedFields);
  };

  const handleTypeChange = (
    index: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, type: event.target.value } : field
    );
    setFields(updatedFields);
  };

  const staticInputFields = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Phone No", value: "phone", type: "number" },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedIndexes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const requiredCheckBox = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, isRequired: checked } : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const selectedFields = selectedIndexes.map((index) => {
      const field = staticInputFields.find((item) => item.value === index);
      console.log(field, "field");
      return {
        type: field?.type || "",
        name: field?.value || "",
        label: field?.label || "",
      };
    });

    const combinedFields = [...selectedFields, ...fields];

    localStorage.setItem("formData", JSON.stringify(combinedFields.concat()));
    const documentId = getLocalStorageItem("documentId");
    try {
      const payload = { documentId: documentId, fields: combinedFields };
      const response = await axiosInstance.post("/user/form", payload);
      console.log(response, "responsess");
      if (response.status === 200) {
        toast.success(response.data.message);
        setFields(fields);
        setSelectedIndexes(selectedIndexes);
      }
    } catch (error: any) {
      toast.error("Please enter the value for custom form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={5}
      >
        <Text fontSize={25} fontWeight={"700"}>
          Lead Generation Form
        </Text>
        <Box display={"flex"} justifyContent={"flex-end"} gap={"20px"}>
          <Button onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </Box>
      </Box>

      <CardContainer
        border={"1px solid #e2e8f0"}
        padding="20px"
        boxShadow="md"
        borderRadius="10px"
        height={"auto"}
      >
        <FormControl as="form" onSubmit={handleSubmit} mb={4}>
          <Box>
            <Text
              textAlign={"center"}
              my="3"
              fontSize={16}
              fontWeight={400}
              mb={4}
            >
              Select any Field from here or add any custom field by clicking on
              + button
            </Text>
            <Box display={"flex"} justifyContent={"space-evenly"} gap={4}>
              {staticInputFields.map((item) => (
                <Checkbox
                  key={item.value}
                  isChecked={selectedIndexes.includes(item.value)}
                  onChange={() => handleCheckboxChange(item.value)}
                  fontWeight={"600"}
                  fontSize={"medium"}
                >
                  {item.label}
                </Checkbox>
              ))}
              <Button onClick={addField}>
                <BiPlus />
              </Button>
            </Box>

            <Box ml="3" mt="4">
              {selectedIndexes.length >= 1 ? (
                <Flex w="100%" mt="2">
                  <Box w={"220px"}>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Field Type
                    </label>
                  </Box>
                  <Box w={"220px"}>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Field Name
                    </label>
                  </Box>
                  <Box w={"180px"}>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Field Label
                    </label>
                  </Box>
                </Flex>
              ) : null}

              {selectedIndexes.map((selectedValue) => {
                const selectedItem = staticInputFields.find(
                  (item) => item.value === selectedValue
                );
                return (
                  <Flex key={selectedItem?.value} gap="3" mt="2">
                    <Input
                      type="text"
                      value={selectedItem?.type}
                      name="name"
                      placeholder="Enter field name"
                      mb={2}
                      disabled
                    />
                    <Input
                      type="text"
                      value={selectedItem?.value}
                      name="name"
                      placeholder="Enter field name"
                      mb={2}
                      disabled
                    />{" "}
                    <Input
                      type="text"
                      value={selectedItem?.label}
                      name="name"
                      placeholder="Enter field name"
                      mb={2}
                      disabled
                    />
                  </Flex>
                );
              })}
            </Box>
          </Box>

          <Box mt={10}>
            {/* <Text textAlign={"center"} fontSize={22} fontWeight={600} mb={4}>
              Custom Form
            </Text> */}
            {fields.map((field, index) => (
              <Box key={index} mb={4}>
                <Box
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <Box>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Select Field Type
                    </label>
                    <Select
                      value={field?.type}
                      onChange={(event) => handleTypeChange(index, event)}
                      mt="2"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="email">Email</option>
                      <option value="date">Date</option>
                      <option value="textarea">Textarea</option>
                    </Select>
                  </Box>

                  <Box w={"180px"}>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Field Name
                    </label>
                    <Input
                      type="text"
                      value={field.name}
                      name="name"
                      placeholder="Enter field name"
                      onChange={(event) => handleInputChange(index, event)}
                      mt={2}
                    />
                  </Box>
                  <Box w={"180px"}>
                    <label
                      style={{
                        marginBottom: "20px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Field Label
                    </label>
                    <Input
                      type="text"
                      value={field.label}
                      name="label"
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="enter field label"
                      mt={2}
                    />
                  </Box>

                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    mb={4}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "small",
                        fontWeight: "500",
                      }}
                    >
                      Required
                    </label>
                    <Checkbox
                      mt="2"
                      isChecked={field.isRequired}
                      onChange={(event) => requiredCheckBox(index, event)}
                    ></Checkbox>
                  </Box>

                  <Box mt={4}>
                    <RxCross2
                      color="red"
                      style={{
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "4px",
                      }}
                      onClick={() => removeField(index)}
                      size={"20px"}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </FormControl>
      </CardContainer>
    </Box>
  );
};

export default DynamicForm;
