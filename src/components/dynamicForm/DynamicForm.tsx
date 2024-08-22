"use client";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  Input,
  Select,
  Table,
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
  type: string;
  name: string;
  label: string;
  isRequired: boolean;
}

const DynamicForm = () => {
  const [fields, setFields] = useState<FormFields[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);

  const addField = () => {
    setFields([
      ...fields,
      { type: "text", name: "", label: "", isRequired: false },
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
      return {
        type: field?.type || "",
        name: field?.value || "",
        label: field?.label || "",
      };
    });

    const combinedFields = [...fields, ...selectedFields];

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
      toast.error(
        error.response.data.messgage || "Please enter the value for custom form"
      );
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
          <Button onClick={addField}>
            <BiPlus />
          </Button>
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
            <Text textAlign={"center"} fontSize={22} fontWeight={600} mb={4}>
              Select Default Fields
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
            </Box>
            <Box mt={5}>
              {selectedIndexes.length >= 1 ? (
                <Table mb={5}>
                  <Thead>
                    <Tr>
                      <Th textAlign={"center"}>Type</Th>
                      <Th textAlign={"center"}>Name</Th>
                      <Th textAlign={"center"}>Label</Th>
                    </Tr>
                  </Thead>
                </Table>
              ) : null}

              {selectedIndexes.map((selectedValue) => {
                const selectedItem = staticInputFields.find(
                  (item) => item.value === selectedValue
                );
                return (
                  <Box
                    display={"flex"}
                    gap={4}
                    mb={4}
                    key={selectedItem?.value}
                    justifyContent={"space-evenly"}
                  >
                    <Box textColor={"gray"} fontWeight={500}>
                      <Card
                        p={"10px 70px"}
                        textColor={"gray.500"}
                        bg={"#e2e8f0"}
                      >
                        <Text fontSize={"13px"}>{selectedItem?.type}</Text>
                      </Card>
                    </Box>
                    <Box textColor={"gray"} fontWeight={500}>
                      <Card
                        p={"10px 70px"}
                        textColor={"gray.500"}
                        bg={"#e2e8f0"}
                      >
                        <Text fontSize={"13px"}>{selectedItem?.value}</Text>
                      </Card>
                    </Box>

                    <Box textColor={"gray"} fontWeight={500}>
                      <Card
                        p={"10px 70px"}
                        textColor={"gray.500"}
                        bg={"#e2e8f0"}
                      >
                        <Text fontSize={"13px"}>{selectedItem?.label}</Text>
                      </Card>
                    </Box>
                  </Box>
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
                      value={field.type && field.label}
                      onChange={(event) => handleTypeChange(index, event)}
                      mb={2}
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
                      mb={2}
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
                      Label
                    </label>
                    <Input
                      type="text"
                      value={field.label}
                      name="label"
                      onChange={(event) => handleInputChange(index, event)}
                      placeholder="enter field label"
                      mb={2}
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
                      isChecked={field.isRequired}
                      onChange={(event) => requiredCheckBox(index, event)}
                    ></Checkbox>
                  </Box>

                  <Box mt={4}>
                    <RxCross2
                      color="white"
                      style={{
                        background: "red",
                        borderRadius: "4px",
                        cursor: "pointer",
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
