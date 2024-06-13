import { AxiosResponse } from "axios";
import { $api } from "../http";
import { InputsUpdateUserInfo } from "../components/Forms/models";
import { IUser } from "../models/IUser";
import { INotification } from "../store/reducers/notifications/NotificationSlice";

export interface IRegisterBody {
    userId: number;
    token: string;
}

export default class NotificationService {
    static async registerToken(body: IRegisterBody): Promise<AxiosResponse<INotification[]>> {
        return $api.post<INotification[]>(`/notifications/register/`, body);
    }
}