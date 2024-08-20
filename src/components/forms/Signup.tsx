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
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
import { FormInputs, useAuth } from "../../hooks/useAuth"


const Signup: React.FC = () => {

  const router = useRouter();
  const onSubmit = async (value: FormInputs) => {
    try {
      setLoading(true);
      const data = {
        firstname: value.firstName,
        ...(value.lastName && { lastname: value.lastName }),
        email: value.email,
        password: value.password,
      };
      console.log('data', data)
      const response = await axiosInstance.post("user/signup", data);
      toast.success(response?.data?.message);
      if (response.status === 200) {
        console.log('helo')
        setLocalStorageItem(
          "verifyOtpToken",
          response?.data?.data?.accessToken
        );
        router.push(`/otp?email=${value.email}`);
      }
    } catch (error: any) {
      console.log(error, 'dneideid')
      setErrors(errors)
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  const {
    value,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setErrors,
    setLoading, } = useAuth({
      onSubmit,
      formType: 'signup',
    })

  return (
    <>
      <Text textColor={"white"} p={"20px"} as="b" fontSize={36}>
        SignUp
      </Text>
      <CardContainer
        width="80%"
        padding={"20px"}
        boxShadow={"sm"}
        border={"none"}
        borderRadius={"8px"}
        as={false}
      >
        <>
          <form onSubmit={handleSubmit} action='javascript:void(0)'>
            <FormControl id="firstName" mb={4}>
              <FormLabel display={"flex"} gap={"3px"}>
                First Name <Text textColor="red">*</Text>
              </FormLabel>
              <Input
                type="text"
                // {...register("firstName", {
                //   required: "First name is required",
                // })}
                value={value.firstName || ""}
                onChange={handleChange}
                placeholder="enter your first name"
                textColor="black"
              />
              {errors.firstName && (
                <Text color="red.500">{errors.firstName}</Text>
              )}
            </FormControl>
            <FormControl id="lastName" mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                // {...register("lastName")}
                value={value.lastName || ""}
                onChange={handleChange}
                placeholder="enter your last name"
              />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel display={"flex"} gap={"3px"}>
                Email<Text textColor="red">*</Text>
              </FormLabel>
              <Input
                type="email"
                // {...register("email", { required: "Email is required" })}
                placeholder="enter your email"
                value={value.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <Text color="red.500">{errors.email}</Text>
              )}
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel display={"flex"} gap={"3px"}>
                Password<Text textColor="red">*</Text>
              </FormLabel>
              <Input
                type="password"
                // {...register("password", {
                //   required: "Password is required",
                //   minLength: {
                //     value: 8,
                //     message: "Password must be at least 8 characters",
                //   },
                // })}
                value={value.password || ""}
                onChange={handleChange}
                placeholder="enter your password"
              />
              {errors.password && (
                <Text color="red.500">{errors.password}</Text>
              )}
            </FormControl>
            <FormControl id="confirmPassword" mb={6}>
              <FormLabel display={"flex"} gap={"3px"}>
                Confirm Password <Text textColor="red">*</Text>
              </FormLabel>
              <Input
                type="password"
                // {...register("confirmPassword", {
                //   required: "Please confirm your password",
                // })}
                placeholder="confirm your password"
                value={value.confirmPassword || ""}
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
        </>
      </CardContainer>
    </>
  );
};

export default Signup;
