import axiosInstance from "@/utils/axiosInstance";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const isForget = searchParams.get("isForget");
  const handleVerifyOtp = async () => {
    try {
      if (otp.length < 4) {
        toast.error("plese enter full OTP");
        return;
      }
      setLoading(true);
      const verifyOtpToken = getLocalStorageItem("verifyOtpToken");
      const response = await axiosInstance.post(
        "/user/verify",
        { otp },
        {
          headers: {
            token: `Bearer ${verifyOtpToken}`,
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleResetOtp = async () => {
    try {
      const response = await axiosInstance.post("/user/resend", { email });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleForgetOtp = async () => {
    try {
      const response = await axiosInstance.post("/user/verify-otp", {
        email,
        otp,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setLocalStorageItem("uniqueCode", response?.data?.uniqueCode);
        console.log("ENTERRRRHERREE");
        router.push("/resetPassword");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={
          <span
            style={{
              textAlign: "center",
              marginLeft: "5px",
              fontWeight: 700,
              marginRight: "5px",
              width: "20px",
            }}
          >
            -
          </span>
        }
        renderInput={(props) => <input {...props} />}
        inputType="number"
        inputStyle={{
          width: "76px",
          marginBottom: "10px",
          height: "70px",
          borderTop: "none",
          borderLeft: "none",
          fontSize: "30px",
          borderRight: "none",
          borderRadius: "8px",
        }}
      />
      <Box width={"64%"} p={4}>
        <Button
          colorScheme="cyan"
          color={"white"}
          width={"full"}
          isLoading={loading}
          onClick={isForget ? handleForgetOtp : handleVerifyOtp}
        >
          Verify Otp
        </Button>
      </Box>
      <Text
        cursor={"pointer"}
        as="b"
        p={4}
        display={"flex"}
        justifyContent={"center"}
      >
        Did't receive the OTP?
        <Text color="#0bc5ea" as="b" marginLeft={1} onClick={handleResetOtp}>
          Resend OTP
        </Text>
      </Text>
    </>
  );
};

export default Otp