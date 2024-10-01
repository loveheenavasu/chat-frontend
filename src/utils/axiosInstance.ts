"use client";
import axios from "axios";
import {
  getLocalStorageItem,
  removeParticularItemFromLocalStorage,
} from "./localStorage";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = getLocalStorageItem("authToken");
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
      removeParticularItemFromLocalStorage("authToken");
      Cookies.remove("authToken");
      toast.error(response.data.message);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
