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
    const result = await apiClient.get<FetchApiResponse<T>>(
      this.apiResourcePath,
      axiosReqConfig,
    );
    return result.data;
  };

  post = async (axiosReqConfig: AxiosRequestConfig) => {
    const result = await apiClient.post<FetchApiResponse<T>>(
      this.apiResourcePath,
      axiosReqConfig.data,
    );
    return result.data;
  };
}

export default ApiService;
