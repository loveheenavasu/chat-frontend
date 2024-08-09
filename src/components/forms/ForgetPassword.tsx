"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";

interface FormData {
  email: string;
}

const ForgetPasswordCard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!formData.email) {
        toast.error("please enter the email");
        return;
      }

      setLoading(true);
      const response = await axiosInstance.post("user/forgot", {
        email: formData.email,
      });
      toast.success(response?.data?.message);
      if (response.status === 200) {
        setLocalStorageItem(
          "verifyOtpToken",
          response?.data?.data?.accessToken
        );
        router.push(`/otp?email=${formData.email}&isForget=true`);
      }
    } catch (error: any) {
      console.log(error, "ecvcvu4c");
      toast.error(error.response?.data.message);
      setLoading(false);
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
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="text" value={formData.email} onChange={handleChange} />
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
};

export default ForgetPasswordCard;
