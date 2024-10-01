"use client";

import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
import { FormInputs, useAuth } from "@/hooks/useAuth";

const ForgetPassword: React.FC = () => {

  const router = useRouter();

  const onSubmit = async (value: FormInputs) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("user/forgot", {
        email: value.email,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setLocalStorageItem("verifyOtpToken", response?.data?.data?.accessToken);
        router.push(`/otp?email=${value.email}&isForget=true`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const {
    value,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setErrors,
    setLoading, } = useAuth({
      onSubmit,
      formType: 'forgotpassword'
    })

  return (
    <>
      <Text textColor={"white"} p={"20px"} as="b" fontSize={36}>
        Enter Your Email Address
      </Text>
      <CardContainer
        width={"80%"}
        padding={"20px"}
        boxShadow={"sm"}
        border={"none"}
        borderRadius={"8px"}
        as={false}
      >
        <>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={value.email}
                onChange={handleChange}
                placeholder="enter your email"
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}
            </FormControl>
            <Button
              colorScheme="cyan"
              color={"white"}
              width="full"
              type="submit"
              isLoading={loading}
            >
              Forget password
            </Button>
          </form>

          <Text
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
          </Text>
        </>
      </CardContainer>
    </>
  );
};

export default ForgetPassword;
