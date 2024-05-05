import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { $api } from "../http";
import { Inputs, InputsLogin } from "../components/Forms/models";


export default class AuthService {
    static async login(body: InputsLogin): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/login", body);
    }

    static async registration(body: Inputs): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/registration", body);
    }

    static async logout(): Promise<void> {
        return $api.post("/auth/logout");
    }

    static async activate(code: string) {
        return $api.get(`/auth/activate/${code}`);
    }

    static async sendLetter(userId: number) {
        return $api.get(`/auth/activate/latter/${userId}`);
    }
}