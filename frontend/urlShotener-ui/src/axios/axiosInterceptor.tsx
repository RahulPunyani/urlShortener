import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.open("/login", "_self");
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      //Cookies.remove("token");
      window.open("/login", "_self");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
