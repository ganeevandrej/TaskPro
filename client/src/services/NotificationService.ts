import { AxiosResponse } from "axios";
import { $api } from "../http";
import { InputsUpdateUserInfo } from "../components/Forms/models";
import { IUser } from "../models/IUser";
import { INotification } from "../store/reducers/notifications/NotificationSlice";
import { NotificationContentInput, NotificationRequestInput } from "expo-notifications";

export interface IRegisterBody {
    userId: number;
    token: string;
}

export interface IDeleteBody {
    userId: number;
    taskId: number;
}

export default class NotificationService {
    static async registerToken(body: IRegisterBody): Promise<AxiosResponse<INotification[]>> {
        return $api.post<INotification[]>(`/notifications/register/`, body);
    }

    static async getNotifications(userId: number): Promise<AxiosResponse<INotification[]>> {
        return $api.get<INotification[]>(`/notifications/${userId}`);
    }

    static async readNotifications(userId: number): Promise<AxiosResponse<INotification[]>> {
        return $api.get<INotification[]>(`/notifications/read/${userId}`);
    }

    static async sendNotification(message: NotificationContentInput): Promise<AxiosResponse> {
        return $api.post(`/notifications/send`, message);
    }
    
    static async deleteNotification(taskId: number): Promise<AxiosResponse> {
        return $api.delete(`/notifications/delete/${taskId}`);
    }
}