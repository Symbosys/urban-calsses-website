import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
    baseURL: window.location.hostname === "localhost" 
        ? "http://localhost:4000/api/v1" 
        : "https://urban-calsses-backend.vercel.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;     
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;