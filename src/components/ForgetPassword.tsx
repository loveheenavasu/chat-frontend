"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localStorage";
import CardContainer from "@/components/cardContainer/CardContainer";
export default function ForgetPasswordCard() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({
    email: "",
  });
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
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = "Email is not valid.";
    }
    setErrors(errors)
    return formIsValid;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      try {
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
        console.log(error, 'ecvcvu4c')
        toast.error(error.response?.data.message);
        setLoading(false);
      }
    }

  };

  return (
    <>
      <Text textColor={'white'} p={'20px'} as="b" fontSize={36}>Enter Your Email Address</Text>
      <CardContainer
        width={'80%'}
        padding={"20px"}
        boxShadow={"sm"}
        border={'none'}
        borderRadius={'8px'}
        as={false}
      >
        <>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="text" value={formData.email} onChange={handleChange}
                placeholder="enter your email" />
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
          </form>
        </>
      </CardContainer>
    </>
  );
}
