import axios from "axios";
import {BASE_URL} from "./constants"
import { adminInfoGetterService, adminInfoRemovalService } from "./service";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
    headers: {
      "ngrok-skip-browser-warning": true,
      'Platform': 'admin', 
      Authorization: `Bearer ${adminInfoGetterService()}`
    },
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${adminInfoGetterService()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      adminInfoRemovalService();
      window.location = "/";
    } else return Promise.reject(error);
  }
);
