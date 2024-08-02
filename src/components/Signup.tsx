"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../app/signUp/signup.module.css";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";
export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!formData.password || !formData.email) {
        toast.error("Please fill all the fields");
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Please enter same password");
        return;
      }
      setLoading(true);
      const data = { email: formData.email, password: formData.password };
      const response = await axiosInstance.post("user/signup", data);
      toast.success(response?.data?.message);
      if (response.status === 200) {
        setLocalStorageItem(
          "verifyOtpToken",
          response?.data?.data?.accessToken
        );
        router.push(`/otp?email=${formData.email}`);
      }
    } catch (error: any) {
      toast.error(error.response.data.errorMessage);
      setLoading(false);
    }
  };

  return (
    <Box className={styles.cardContainer} as="form" onSubmit={handleSubmit}>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="text" value={formData.email} onChange={handleChange} />
      </FormControl>
      <FormControl id="password" mb={6}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="confirmPassword" mb={6}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </FormControl>

      <Button
        colorScheme="cyan"
        color={"white"}
        width="full"
        type="submit"
        isLoading={loading}
      >
        Send Otp
      </Button>
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
    </Box>
  );
}
