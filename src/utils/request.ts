import axios, { AxiosProxyConfig, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
// import { Notification } from "@arco-design/web-react";

const BASE_CONFIG: Partial<AxiosRequestConfig> = {
  baseURL: "/backend/api/",
};

const client = axios.create(BASE_CONFIG);

axiosRetry(client, { retries: 3 });

const http = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  config?: AxiosRequestConfig
) => {
  try {
    const r = await client(url, { method, ...config });
    if (r?.data?.status) {
      // 存在错误，弹窗处理。
      console.error({
        title: "错误",
        content: r?.data?.prompts ?? "默认错误内容",
      });

      return r?.data as T;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const httpGet = <T>(url: string, config?: AxiosRequestConfig) => {
  return http<T>("GET", url, config);
};

const httpPost = <T>(
  url: string,
  data?: AxiosRequestConfig["data"],
  config?: AxiosRequestConfig
) => {
  return http<T>("POST", url, { data, ...config });
};

const httpDelete = <T>(
  url: string,
  params?: AxiosRequestConfig["data"],
  config?: AxiosRequestConfig
) => {
  return http<T>("DELETE", url, { params, ...config });
};

const httpPut = <T>(
  url: string,
  data?: AxiosRequestConfig["data"],
  config?: AxiosRequestConfig
) => {
  return http<T>("PUT", url, { data, ...config });
};

export { httpGet, httpPost, httpDelete, httpPut, http };
