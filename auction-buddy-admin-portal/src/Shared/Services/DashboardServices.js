import { axiosInstance } from "../axios";

export const getAllAuctions = async (params) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/auction`, {params:{...params}});
      return data;
    } catch (e) {
      return {
        error: "Something went wrong",
      };
    }
  };
export const getAuctionDetails = async (params) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/pocket-services/admin/queries`, {params:{...params}});
      return data;
    } catch (e) {
      return {
        error: "Something went wrong",
      };
    }
  };
export const getAuctionCount = async (params) => {
    try {
      const { data } = await axiosInstance.get(`api/v1/auction/auction-count`);
      return data;
    } catch (e) {
      return {
        error: "Something went wrong",
      };
    }
  };
  