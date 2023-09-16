import { axiosInstance } from "../axios";

export const verifyOtp = async (creds) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v1/auth/verify-otp`,
      { ...creds }
    );
    return data;
  } catch (e) {
    return {
      error: "Email/Password Invalid",
    };
  }
};

export const sendOtp = async (creds) => {
  try {
    // const { data } = await axiosInstance.post(`api/v1/admin/send-otp`, creds);
    const { data } = await axiosInstance.post(
      `/api/v1/auth/send-otp`, { ...creds }

    );
    return data;
  } catch (e) {
    return {
      // error: "Email/Password Invalid",
      error: e,
    };
  }
};
