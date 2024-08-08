"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
    console.log(formIsValid, "VALIDDD")
    return formIsValid;
  };
  const handleSubmit = async (e: any) => {
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
        // setErrors({ ...errors, form: error.response.data.errorMessage });
        toast.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      console.log('ERROR paras')
    }
  };

  return (
    <>
      <Text textColor={'white'} p={'20px'} as="b" fontSize={36}>Reset Your Password</Text>
      <Box
        w="80%"
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
        </Flex>
        <FormControl id="password" mb={6}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="enter your new password"
          />
          {errors.password && <Text color="red.500">{errors.password}</Text>}
        </FormControl>
        <FormControl id="confirmPassword" mb={6}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="confirm your password"

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
    </>
  );
}
