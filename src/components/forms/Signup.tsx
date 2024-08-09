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
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("confirmPassword", {
          message: "Please enter the same password",
        });
        return;
      }
      setLoading(true);
      const data = {
        firstname: formData.firstName,
        ...(formData.lastName && { lastname: formData.lastName }),
        email: formData.email,
        password: formData.password,
      };
      const response = await axiosInstance.post("user/signup", data);
      toast.success(response?.data?.message);
      console.log(response);
      if (response.status === 200) {
        setLocalStorageItem(
          "verifyOtpToken",
          response?.data?.data?.accessToken
        );
        router.push(`/otp?email=${formData.email}`);
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        toast.error(
          "Email is already registered. Please use a different email or log in."
        );
      }
      toast.error(error.response?.data?.errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Heading textColor={"white"} p={"20px"} fontFamily={"serif"}>
        Signup
      </Heading>
      <Box
        w="80%"
        margin="auto"
        padding="20px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        bg="white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="firstName" mb={4}>
            <FormLabel display={"flex"} gap={"3px"}>
              First Name <Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="text"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <Text color="red.500">{errors.firstName.message}</Text>
            )}
          </FormControl>
          <FormControl id="lastName" mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" {...register("lastName")} />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel display={"flex"} gap={"3px"}>
              Email<Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel display={"flex"} gap={"3px"}>
              Password<Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>
          <FormControl id="confirmPassword" mb={6}>
            <FormLabel display={"flex"} gap={"3px"}>
              Confirm Password <Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <Text color="red.500">{errors.confirmPassword.message}</Text>
            )}
          </FormControl>

          <Button
            colorScheme="cyan"
            color={"white"}
            width="full"
            type="submit"
            isLoading={loading}
          >
            Send OTP
          </Button>
          <Text
            cursor={"pointer"}
            as="b"
            p={4}
            display={"flex"}
            justifyContent={"center"}
          >
            Already have an account?{" "}
            <Text
              color="#0bc5ea"
              as="b"
              marginLeft={1}
              onClick={() => router.push("/login")}
            >
              Login
            </Text>
          </Text>
        </form>
      </Box>
    </>
  );
};

export default Signup;
