import { axiosInstance } from "./axios";

export const adminInfoGetterService = () => {
  return localStorage.getItem("AB-token");
};

export const adminInfoStorageService = (data) => {
  localStorage.setItem("AB-token", data);
};

export const adminInfoRemovalService = () => {
  localStorage.removeItem("AB-token");
};

