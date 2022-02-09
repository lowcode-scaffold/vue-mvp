import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";

const instance = axios.create({
  timeout: 30 * 1000,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (error) => {
    message.error(error.message || "网络异常");
    return Promise.reject(error);
  },
);

type Request = <T = unknown>(config: AxiosRequestConfig) => Promise<T>;

export const request = instance.request as Request;
