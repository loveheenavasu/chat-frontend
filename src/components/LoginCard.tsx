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
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

type LoginData = {
  email: string;
  name: string;
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

const LoginCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const isLoggedIn = getLocalStorageItem("authToken");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const authen = async (data: LoginData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/social-login
`,
        data
      );
      const { accessToken, _id, expiresIn } = response.data;
      const expirationTime: any = new Date().getTime() + expiresIn * 1000;
      console.log(expirationTime, 'expirationTime')
      Cookies.set("authToken", accessToken);
      setLocalStorageItem("authToken", accessToken);
      setLocalStorageItem("userId", _id);
      Cookies.set('tokenExpiration', expirationTime);
      location.reload();
    }
    catch (error) {
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

  const validate = () => {
    let formIsValid = true;
    let errors: any = {};
    if (!loginData.email) {
      formIsValid = false;
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      formIsValid = false;
      errors.email = "Email is not valid.";
    }
    if (!loginData.password) {
      formIsValid = false;
      errors.password = "Please enter your password.";
    } else if (loginData.password.length < 8) {
      formIsValid = false;
      errors.password = "Password must be at least 8 characters long.";
    }
    setErrors(errors);
    return formIsValid;
  };
  const handleSubmit = async (e: any) => {
    if (validate()) {
      try {
        e.preventDefault();
        setLoading(true);
        const response = await axiosInstance.post("/user/login", loginData);
        if (response.status === 200) {
          Cookies.set("authToken", response?.data?.data?.accessToken);
          setLocalStorageItem("authToken", response?.data?.data?.accessToken);
          toast.success(response.data?.message);
          setLoading(false);
          router.push("/");
          location.reload();
        }
      } catch (error: any) {
        toast.error(error.response?.data.message);
        // setErrors({ ...errors, form: error.response.data.errorMessage });
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
    >
      <FormControl id="username" mb={4} onSubmit={handleSubmit}>
        <FormLabel display="flex" gap="3px">
          Email <Text textColor="red">*</Text>
        </FormLabel>
        <Input
          type="text"
          value={loginData?.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          required
        />
        {errors.email && <Text color="red.500">{errors.email}</Text>}
      </FormControl>
      <FormControl id="password" mb={6}>
        <FormLabel display="flex" gap="3px">
          Password <Text textColor="red">*</Text>
        </FormLabel>
        <Input
          type="password"
          value={loginData?.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
        />
        {errors.password && <Text color="red.500">{errors.password}</Text>}
      </FormControl>
      <Button
        colorScheme="cyan"
        color="white"
        width="full"
        isLoading={loading}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Flex w="100%" justifyContent="center" marginTop="20px">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </Flex>
      <Text
        cursor="pointer"
        as="b"
        p={4}
        display="flex"
        justifyContent="center"
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
        Forgotten Your password ?{" "}
        <Text
          color="#0bc5ea"
          as="b"
          marginLeft={1}
          onClick={() => router.push("/forgetpassword")}
        >
          Forget Password
        </Text>
      </Text>
    </Box>
  );
};

export default LoginCard;
