import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://backend.umairabaya.com", // Environment variable for API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for request/response interceptors
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export default apiClient;
