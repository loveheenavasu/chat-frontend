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
import React, { FormEvent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import CardContainer from "@/components/cardContainer/CardContainer";
import { FormInputs, useAuth } from "@/hooks/useAuth";

type LoginData = {
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  socialToken: string;
  isAdmin: boolean;
};

type ResponseMessage = {
  credential?: string;
  clientId?: string;
  select_by?: string;
};

interface CustomJwtPayload extends JwtPayload {
  firstname: string;
  lastname: string;
  email: string;
  name: string;
  picture: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const isLoggedIn = getLocalStorageItem("authToken");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const authen = async (data: LoginData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/social-login`,
        data
      );
      const { accessToken, _id } = response.data;
      Cookies.set("authToken", accessToken);
      setLocalStorageItem("authToken", accessToken);
      setLocalStorageItem("userId", _id);
      location.reload();
    } catch (error) {
      console.error(error, "Error during authentication");
    }
  };

  const responseMessage = (response: ResponseMessage) => {
    if (response.credential != null) {
      const USER_CREDENTIAL = jwtDecode(
        response.credential
      ) as CustomJwtPayload;
      console.log(USER_CREDENTIAL);

      const newLoginData = {
        firstname: USER_CREDENTIAL?.given_name,
        lastname: USER_CREDENTIAL?.family_name,
        email: USER_CREDENTIAL?.email,
        name: USER_CREDENTIAL?.name,
        image: USER_CREDENTIAL?.picture,
        socialToken: response.credential,
        isAdmin: true,
      };

      authen(newLoginData);

      if (newLoginData) {
        router.push("/");
      }
    }
  };
  const errorMessage = (error?: string) => {
    console.log(error, "error");
  };

  const onSubmit = async (value: FormInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", value);
      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        Cookies.set("authToken", accessToken);
        setLocalStorageItem("authToken", accessToken);
        toast.success(response.data.message);
        router.push("/");
        console.log("Setting token:", accessToken);
        console.log(
          "Current token in LocalStorage:",
          getLocalStorageItem("authToken")
        );
      } else {
        toast.error("Unexpected response status: " + response.status);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const {
    value,
    errors,
    loading,
    handleChange,
    setLoading,
    handleSubmit,
    setValue,
  } = useAuth({
    onSubmit,
    formType: "login",
  });

  return (
    <>
      <Text textColor={"white"} p={"20px"} as="b" fontSize={36}>
        Login
      </Text>

      <CardContainer
        width="90%"
        padding={"20px"}
        boxShadow={"sm"}
        border={"none"}
        background={""}
        borderRadius={"8px"}
        as={false}
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="username" mb={4}>
            <FormLabel display="flex" gap="3px">
              Email <Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="text"
              value={value?.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              // onChange={handleChange}
              placeholder="enter your email"
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel display="flex" gap="3px">
              Password <Text textColor="red">*</Text>
            </FormLabel>
            <Input
              type="password"
              value={value?.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              // onChange={handleChange}
              placeholder="enter your password"
            />
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>
          <Button
            colorScheme="cyan"
            color="white"
            width="full"
            isLoading={loading}
            type="submit"
          >
            Login
          </Button>
          <Flex w="100%" justifyContent="center" marginTop="20px">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </Flex>
          <Text
            cursor="pointer"
            as="b"
            marginLeft={1}
            // onClick={() => router.push("/forgetPassword")}
            display={"flex"}
            p={2}
            justifyContent={"center"}
          >
            Don't have an Account?
            <Text
              color="#0bc5ea"
              as="b"
              marginLeft={1}
              onClick={() => router.push("/signUp")}
            >
              Sign up
            </Text>
          </Text>
          <Text
            cursor={"pointer"}
            as="b"
            p={1}
            display={"flex"}
            justifyContent={"center"}
          >
            Forgotten Your Password ?{" "}
            <Text
              color="#0bc5ea"
              as="b"
              marginLeft={1}
              onClick={() => router.push("/forgetPassword")}
            >
              Forgot Password
            </Text>
          </Text>
        </form>
      </CardContainer>
    </>
  );
};
export default Login;
