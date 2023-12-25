import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://app.starbuzz.space/api/v2",
  // baseURL: "https://nodev2.starbuzz.ai/api/v2",
  // baseURL: "http://10.50.64.123:8080/api/v2",
});

api.interceptors.request.use((config) => {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  if (maintenanceMode) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/maintenance";
    return Promise.reject(new Error("Maintenance mode is on."));
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
