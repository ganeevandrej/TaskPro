import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = 'http://192.168.1.67:5000/api';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});


$api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            console.log("ghjfgfj")
            try {
                const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
                await AsyncStorage.setItem('accessToken', res.data.accessToken);
                return $api.request(originalRequest);
            } catch (error) {
                console.log(error)
            }
        }
        throw error;
    }
);