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
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
import { FormInputs, useAuth } from "@/hooks/useAuth";

const Resetpassword: React.FC = () => {

  const router = useRouter();
  const uniqueCode = getLocalStorageItem("uniqueCode");

  const onSubmit = async (value: FormInputs) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("user/reset", {
        uniqueCode,
        password: value.password,
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
      formType: 'resetpassword'
    })
  return (
    <>
      <Text textColor={"white"} p={"20px"} as="b" fontSize={36}>
        Reset Your Password
      </Text>
      <CardContainer
        width="80%"
        padding={"20px"}
        boxShadow={"sm"}
        border={"none"}
        background={""}
        borderRadius={"8px"}
        as={false}
      >
        <>
          <form onSubmit={handleSubmit}>
            <Flex
              w="100%"
              justifyContent="center"
              alignItems="center"
              fontWeight={700}
              fontSize="xl"
              my="2"
            ></Flex>
            <FormControl id="password" mb={6}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={value.password}
                onChange={handleChange}
                placeholder="enter your new password"
              />
              {errors.password && (
                <Text color="red.500">{errors.password}</Text>
              )}
            </FormControl>
            <FormControl id="confirmPassword" mb={6}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={value.confirmPassword}
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
          </form>
        </>
      </CardContainer>
    </>
  );
};

export default Resetpassword;
