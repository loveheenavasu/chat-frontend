"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPlusCircle } from "react-icons/bi";
import axiosInstance from "@/utils/axiosInstance";
import CardContainer from "@/components/cardContainer/CardContainer";
import { toast } from "react-toastify";
import { EditIcon } from "@chakra-ui/icons";
import { TiTick } from "react-icons/ti";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

interface FormFields {
  type?: string | number;
  name?: string;
  label?: string;
  isRequired?: boolean;
  isCustom?: boolean;
}

const DynamicForm = () => {
  const [fields, setFields] = useState<FormFields[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([
    "name",
    "email",
    "phone",
  ]);
  const [newField, setNewField] = useState({
    type: "text",
    label: "",
    name: "",
  });
  const [items, setItems] = useState<FormFields[]>([]);
  const [disabledFields, setDisabledFields] = useState<boolean[]>([]);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [error, setError] = useState<{ label?: string }>({});
  const [checkboxField, setCheckboxField] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean[]>([]);
  const documentId = getLocalStorageItem("documentId");
  const staticInputFields = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Phone Number", value: "phone", type: "tel" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (disabledFields?.length <= 0) {
      setDisabledFields(new Array(items?.length).fill(true));
    }
  }, [items]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `user/form/?documentId=${documentId}`
      );
      if (response.status === 200) {
        const result = response.data.fields;

        // Filter out duplicates and static fields from the result
        const data = result.filter(
          (item: any) =>
            !staticInputFields.some(
              (staticField) => staticField.value === item.name
            )
        );
        setItems(data);
        const apiStaticFields = result.filter((field: any) =>
          staticInputFields.some(
            (staticField) => staticField.value === field.name
          )
        );
        setCheckboxField(apiStaticFields);
        setSelectedIndexes(apiStaticFields.map((field: any) => field.name));
      }
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box>
        <Flex justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Box>
    );
  }

  const handleNewFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    let formIsValid = true;
    const errors: { label?: string } = {};
    if (!newField.label) {
      formIsValid = false;
      errors.label = "Please enter new question";
    }
    setError(errors);
    return formIsValid;
  };

  const isValidate = () => {
    let formIsValid = true;
    let errors: { selectedIndexes?: string } = {};
    if (selectedIndexes.length <= 0) {
      formIsValid = false;
      errors.selectedIndexes = "Please select at least one checkbox";
    }
    if (!formIsValid) {
      toast.error(errors.selectedIndexes || "Validation failed");
    }
    return formIsValid;
  };

  const addField = () => {
    if (validate()) {
      setFields((prevFields) => [
        ...prevFields,
        { ...newField, name: newField.label, isRequired: true, isCustom: true },
      ]);
      setDisabled((prev) => [...prev, true]);
    }
    setNewField({ type: "text", label: "", name: "" });
  };

  const removeField = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const deleteItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedIndexes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !staticInputFields.some(
            (staticField) => staticField.value === item.name
          )
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const selectedFields = selectedIndexes.map((index) => {
      const field = staticInputFields.find((item) => item.value === index);
      return {
        type: field?.type || "",
        name: field?.value || "",
        label: field?.label || "",
        isRequired: true,
      };
    });

    const postdata = [...selectedFields, ...fields];
    try {
      const payload = { documentId, fields: postdata };
      const response = await axiosInstance.post("/user/form", payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLocalStorageItem("_id", JSON.stringify(response.data.data._id));
        setLocalStorageItem("isFormCompleted", false);

        setIsDataSubmitted(false);
      }
      setFields([]);
      fetchData();
    } catch (error: any) {
      toast.error(error.response.data?.message);
      console.error(error);
    } finally {
      // setIsLoading(false);
      setLoading(false);
    }
  };

  const handleUpdateField = async (e: any) => {
    setLoading(true);
    const selectedFields = selectedIndexes.map((index) => {
      const field = staticInputFields.find((item) => item.value === index);
      return {
        type: field?.type || "",
        name: field?.value || "",
        label: field?.label || "",
        isRequired: true,
      };
    });
    const combinedFields = [...selectedFields, ...fields, ...items];
    try {
      if (!isDataSubmitted) {
        let id: any = getLocalStorageItem("_id");
        id = JSON.parse(id);
        const payload = { _id: id, fields: combinedFields };
        const response = await axiosInstance.put(`/user/form`, payload);
        if (response.status === 200) {
          toast.success(response.data?.message || "Fields Updated");
          // setDataExists(true)
          // location.reload();
        }
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setDisabledFields((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const fieldEditBtn = (index: number) => {
    setDisabled((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  const renderButton = () => {
    if (items.length > 0 || checkboxField.length > 0) {
      return (
        <Button
          isLoading={loading}
          onClick={handleUpdateField}
          colorScheme="blue"
        >
          Save
        </Button>
      );
    } else {
      return (
        <Button isLoading={loading} onClick={handleSubmit} colorScheme="blue">
          Submit
        </Button>
      );
    }
  };

  return (
    <>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Text fontSize={25} fontWeight="700">
            Lead Generation Form
          </Text>
          {renderButton()}
        </Box>

        <CardContainer
          border="1px solid #e2e8f0"
          padding="20px"
          boxShadow="md"
          borderRadius="10px"
          height="auto"
        >
          <FormControl as="form" onSubmit={handleSubmit} mb={4}>
            <Text
              textAlign="center"
              my="3"
              fontSize={16}
              fontWeight={400}
              mb={4}
            >
              Select any Field from here or add any custom field by clicking on
              + button
            </Text>

            <Box display="flex" justifyContent="space-evenly" gap={4}>
              {staticInputFields.map((item) => (
                <Checkbox
                  key={item.value}
                  isChecked={selectedIndexes.includes(item.value)}
                  onChange={() => handleCheckboxChange(item.value)}
                  fontWeight="600"
                  fontSize="medium"
                >
                  {item.label}
                </Checkbox>
              ))}
            </Box>

            <Box mt={10}>
              <Box mb={4} pl="14px">
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                  <Box w="70%">
                    <Input
                      type="text"
                      name="label"
                      placeholder="Enter new question"
                      value={newField.label}
                      onChange={handleNewFieldChange}
                    />
                    {error.label && <Text color="red.500">{error.label}</Text>}
                  </Box>

                  <Box w={100}>
                    <Select
                      name="type"
                      value={newField.type}
                      onChange={handleNewFieldChange}
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="email">Email</option>
                      <option value="date">Date</option>
                      <option value="textarea">Textarea</option>
                    </Select>
                    {error.label ? <Text mb={6}></Text> : null}
                  </Box>
                  <Box>
                    <Button onClick={addField} colorScheme="blue">
                      <BiPlusCircle size="20px" />
                      Add
                    </Button>
                    {error.label ? <Text mb={6}></Text> : null}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box ml="3" mt="4">
              {selectedIndexes.map((selectedValue, index) => {
                const selectedItem = staticInputFields.find(
                  (item) => item.value === selectedValue
                );
                return (
                  <Box key={selectedItem?.value} mt="2" mb={4}>
                    <CardContainer
                      width="100%"
                      border="1px solid #e2e8f0"
                      padding="20px"
                      boxShadow="md"
                      borderRadius="10px"
                    >
                      <Text fontWeight={700} mb={5} mt={3}>
                        What is your {selectedItem?.label}?
                      </Text>
                      <Text fontWeight={500}>Type: {selectedItem?.type}</Text>
                    </CardContainer>
                  </Box>
                );
              })}
            </Box>

            <Box ml="3" mt="4">
              {fields.map((field, index) => (
                <Box mb={4}>
                  <CardContainer
                    key={index}
                    width="100%"
                    border="1px solid #e2e8f0"
                    padding="20px"
                    boxShadow="md"
                    borderRadius="12px"
                  >
                    <Box position="absolute" top="10px" right="10px">
                      <Button
                        _hover={
                          disabled[index]
                            ? { bg: "#363535" }
                            : { bg: "#2a7ac4 " }
                        }
                        bg={disabled[index] ? "black" : "#3182CE"}
                        textColor="white"
                        onClick={() => fieldEditBtn(index)}
                        mr={2}
                      >
                        {disabled[index] ? (
                          <EditIcon />
                        ) : (
                          <TiTick size={"20px"} />
                        )}
                      </Button>

                      <Button
                        colorScheme="red"
                        onClick={() => removeField(index)}
                      >
                        <RiDeleteBin6Line size="20px" />
                      </Button>
                    </Box>
                    {disabled[index] ? (
                      <>
                        <Text fontWeight={700} mb={5} mt={3}>
                          {field.label}
                        </Text>
                        <Text fontWeight={500} mb={5} mt={3}>
                          Type: {field.type}
                        </Text>
                      </>
                    ) : (
                      <Box>
                        <Input
                          value={field?.label}
                          fontWeight={700}
                          width="70%"
                          name="label"
                          mb={4}
                          onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index] = {
                              ...updatedFields[index],
                              label: e.target.value,
                              name: e.target.value,
                            };
                            setFields(updatedFields);
                          }}
                        />
                        <Select
                          value={field?.type}
                          width="70%"
                          name="type"
                          onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index].type = e.target.value;
                            setFields(updatedFields);
                          }}
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="email">Email</option>
                          <option value="date">Date</option>
                          <option value="textarea">Textarea</option>
                        </Select>
                      </Box>
                    )}
                  </CardContainer>
                </Box>
              ))}
              <Box mt="4">
                {items?.map((item, index) => (
                  <Box mb={4}>
                    <CardContainer
                      width="100%"
                      border="1px solid #e2e8f0"
                      padding="20px"
                      boxShadow="md"
                      borderRadius="10px"
                      key={index}
                    >
                      <Box position="absolute" top="10px" right="10px">
                        <Button
                          _hover={
                            disabledFields[index]
                              ? { bg: "#363535" }
                              : { bg: "#2a7ac4 " }
                          }
                          bg={disabledFields[index] ? "black" : "#3182CE"}
                          textColor="white"
                          onClick={() => handleEdit(index)}
                          mr={2}
                        >
                          {disabledFields[index] ? (
                            <EditIcon />
                          ) : (
                            <TiTick size={"20px"} />
                          )}
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteItem(index)}
                        >
                          <RiDeleteBin6Line size="20px" />
                        </Button>
                      </Box>
                      {disabledFields[index] ? (
                        <Box>
                          <Text fontWeight={700} mb={5} mt={3}>
                            {item?.label}
                          </Text>
                          <Text fontWeight={500} mb={5} mt={3}>
                            Type: {item?.type}
                          </Text>
                        </Box>
                      ) : (
                        <Box>
                          <Input
                            value={item?.label}
                            fontWeight={700}
                            width="70%"
                            name="label"
                            mb={4}
                            onChange={(e) => {
                              const updatedFields = [...items];
                              updatedFields[index] = {
                                ...updatedFields[index],
                                label: e.target.value,
                                name: e.target.value,
                              };
                              setItems(updatedFields);
                            }}
                          />
                          <Select
                            value={item?.type}
                            width="70%"
                            name="type"
                            onChange={(e) => {
                              const updatedFields = [...items];
                              updatedFields[index].type = e.target.value;
                              setItems(updatedFields);
                            }}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="textarea">Textarea</option>
                          </Select>
                        </Box>
                      )}
                    </CardContainer>
                  </Box>
                ))}
              </Box>
            </Box>
          </FormControl>
        </CardContainer>
      </Box>
    </>
  );
};
export default DynamicForm;
