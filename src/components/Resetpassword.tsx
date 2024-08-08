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
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";

export default function Resetpassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const uniqueCode = getLocalStorageItem("uniqueCode");
  const handleChange = (e: any) => {
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
    return formIsValid;
  };
  const handleSubmit = async (e: any) => {
    if (validate()) {
      try {
        e.preventDefault();
        // if (formData.password !== formData.confirmPassword) {
        //   return toast.error("please enter the same password");
        // }
        // if (formData.password.length < 4) {
        //   return toast.error("your password is too small ");
        // }
        // setLoading(true);
        const response = await axiosInstance.post("user/reset", {
          uniqueCode,
          password: formData.password,
        });
        toast.success(response?.data?.message);
        if (response.status === 200) {
          removeLocalStorageItem();
          router.push(`/login`);

          setLoading(true);
        }
      } catch (error: any) {
        // setErrors({ ...errors, form: error.response.data.errorMessage });
        // toast.error(error.response.data.message);
        setLoading(false);
      }
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
      {/* <Text
        cursor={"pointer"}
        as="b"
        p={4}
        display={"flex"}
        justifyContent={"center"}
      >
        Don't have an Account?{" "}
        <Text
          color="#0bc5ea"
          as="b"
          marginLeft={1}
          onClick={() => router.push("/login")}
        >
          Login{" "}
        </Text>
      </Text> */}
    </Box>
  );
}
