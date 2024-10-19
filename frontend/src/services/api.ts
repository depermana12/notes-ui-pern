import axios, { AxiosRequestConfig } from "axios";
import { FetchApiResponse } from "../types/type";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

class ApiService<T> {
  apiResourcePath: string;
  constructor(apiResourcePath: string) {
    this.apiResourcePath = apiResourcePath;
  }

  getAll = async (axiosReqConfig: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosReqConfig.headers = {
        ...axiosReqConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const result = await apiClient.get<FetchApiResponse<T>>(
      this.apiResourcePath,
      axiosReqConfig,
    );
    return result.data;
  };

  post = async (axiosReqConfig: AxiosRequestConfig) => {
    try {
      const result = await apiClient.post<FetchApiResponse<T>>(
        this.apiResourcePath,
        axiosReqConfig.data,
      );
      return result.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private errorHandler = (error: any) => {
    if (error.response) {
      return {
        message: error.response.data.message,
        data: null,
      };
    } else if (error.request) {
      return {
        message: error.request,
        data: null,
      };
    } else {
      return {
        message: error.message,
        data: null,
      };
    }
  };
}

export default ApiService;
