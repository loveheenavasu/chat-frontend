"use client";
import axios from "axios";
import { getLocalStorageItem, removeParticularItemFromLocalStorage } from "./localStorage";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


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
    console.log(error, 'bxsx')
    if (response && response.status === 401) {
      // removeParticularItemFromLocalStorage('authToken')
      // Cookies.remove('authToken')
      // window.location.href = "/login"
      console.log(response, "RESPONSECOMING")
      toast.error(response.data.message)
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
