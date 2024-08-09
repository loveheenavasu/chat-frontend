"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";

interface ResetCredentials {
  password: string;
  confirmPassword: string;
}

const Resetpassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetCredentials>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetCredentials>({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const uniqueCode = getLocalStorageItem("uniqueCode");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const validate = () => {
    let formIsValid = true;
    let errors: any = {};

    if (!formData.password) {
      formIsValid = false;
      errors.password = "Please enter your password.";
    }
    if (!formData.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password.length < 8) {
      formIsValid = false;
      errors.password = "Password must be at least 8 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    console.log(formIsValid, "VALIDDD");
    return formIsValid;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("user/reset", {
          uniqueCode,
          password: formData.password,
        });
        toast.success(response?.data?.message);
        if (response.status === 200) {
          removeLocalStorageItem();
          toast.success(response.data?.message);
          router.push(`/login`);
          setLoading(false);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      console.log("ERROR paras");
    }
  };

  return (
    <Box
      w="80%"
      margin="auto"
      padding="20px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      borderRadius="8px"
      bg="white"
      as="form"
      onSubmit={handleSubmit}
    >
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        fontWeight={700}
        fontSize="xl"
        my="2"
      >
        <Text>RESET PASSWORD</Text>
      </Flex>
      <FormControl id="password" mb={6}>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <Text color="red.500">{errors.password}</Text>}
      </FormControl>
      <FormControl id="confirmPassword" mb={6}>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <Text color="red.500">{errors.confirmPassword}</Text>
        )}
      </FormControl>

      <Button
        colorScheme="cyan"
        color={"white"}
        width="full"
        type="submit"
        isLoading={loading}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Resetpassword;
