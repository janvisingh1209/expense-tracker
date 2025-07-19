import axios from "axios";
import { BASE_URL } from "./api-path";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");  //gets accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // attaches the token to every request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;  // returns response if retrieval successful from server
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        window.location.href = "/login";  // if status=401 then unauthorized access redirect to login
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");  // occurs due to server error
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");  // timeout error
    }   

    return Promise.reject(error);
  }
);


export default axiosInstance;
