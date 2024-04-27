import axios, { AxiosRequestTransformer } from "axios";
import { snakeCase } from "lodash-es";
import transformKeys from "../lib/util/transformKeys";

const apiClient = axios.create({
  baseURL: "/api",
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
