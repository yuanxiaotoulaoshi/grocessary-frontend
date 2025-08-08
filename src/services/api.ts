import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// 创建 axios 实例
export const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000'
  : 'https://api.ycong.xyz';
  
const api = axios.create({
  baseURL: BASE_URL, // 你实际接口地址
  timeout: 60000*3,
  withCredentials: true,
});

// 请求拦截器：自动带 token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  (response: AxiosResponse) => response.data, // 直接返回响应体 data
  (error) => {
    if (error.response) {
      // 服务器响应错误
      console.error('请求错误状态码:', error.response.status);
      // 你可以根据状态码做不同处理，比如跳转登录等
    } else {
      // 网络错误或者请求没发出去
      console.error('网络错误或请求超时');
    }
    return Promise.reject(error);
  }
);

// 封装的请求函数
type HttpMethod = 'GET' | 'POST' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  url: string;
  params?: any; // GET 请求用的查询参数
  data?: any;   // POST 请求用的请求体
  // headers:any;
}

export async function request<T = any>({
  method,
  url,
  params,
  data,
  // headers = {},
}: RequestOptions): Promise<T> {
  if (method === 'GET') {
    return api.get(url, { params });
  } else if (method === 'POST') {
    return api.post(url, data);
  } else if (method === 'DELETE') {
    return api.delete(url, { data }); // DELETE 请求支持传 body，但 axios 需要写在 data 字段中
  } else {
    throw new Error(`Unsupported request method: ${method}`);
  }
}
