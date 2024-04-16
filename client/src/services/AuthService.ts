import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { $api } from "../http";
import { Inputs } from "../screens/Registration/Form";
import { InputsLogin } from "../screens/Login/Form";


export default class AuthService {
    static async login(body: InputsLogin): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/login", body);
    }

    static async registration(body: Inputs): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", body);
    }

    static async logout(): Promise<void> {
        return $api.post("/logout");
    }
}