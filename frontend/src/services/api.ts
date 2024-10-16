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

  async getAll(axiosReqConfig: AxiosRequestConfig) {
    const result = await apiClient.get<FetchApiResponse<T>>(
      this.apiResourcePath,
      axiosReqConfig,
    );
    return result.data;
  }
}

export default ApiService;
