import axios, { AxiosRequestTransformer } from "axios";
import { snakeCase } from "lodash-es";
import transformKeys from "../../src/lib/util/transformKeys";

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  transformRequest: [
    (data: Record<string, unknown>) => {
      return transformKeys(data, snakeCase);
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
});

export default apiClient;
