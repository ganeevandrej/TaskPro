import { AxiosResponse } from "axios";
import { $api, API_URL } from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISendAvatarToBackendProprs } from "../store/reducers/auth/ActionCreators";
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadResult, FileSystemUploadType } from "expo-file-system";

export default class UserService {
    static async setUserAvatar({ userId, uriImage }: ISendAvatarToBackendProprs): Promise<FileSystemUploadResult> {
        const accessToken = await AsyncStorage.getItem("accessToken");
        return await FileSystem.uploadAsync(`${API_URL}/upload/avatar/${userId}`, uriImage, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${accessToken}`
            },
            fieldName: 'image',
            httpMethod: 'POST',
            uploadType: FileSystemUploadType.MULTIPART,
        });
    }

    static async getAvatar(userId: number): Promise<AxiosResponse> {
        return $api.get(`/user/avatar/${userId}`);
    }

    static async deleteAvatar(userId: number): Promise<void> {
        return $api.delete(`/upload/avatar/${userId}`);
    }
}