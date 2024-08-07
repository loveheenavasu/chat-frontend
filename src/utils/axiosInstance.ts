"use client";
import axios from "axios";
import { getLocalStorageItem } from "./localStorage";
import { useRouter } from "next/router";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
const authToken = getLocalStorageItem("authToken");

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = authToken;
    if (token) {
      config.headers["token"] = `Bearer ${token}`;
    }

    config.headers["ngrok-skip-browser-warning"] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
