import axios, { AxiosResponse } from "axios";
import { $api, API_URL } from "../http";
import { IUser } from "../models/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class UserService {
    static async setUserAvatar(formAata: FormData) {
        const accessToken = await AsyncStorage.getItem("accessToken");
        return axios.post(`${API_URL}/user/upload/avatar`, formAata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users");
    }
}