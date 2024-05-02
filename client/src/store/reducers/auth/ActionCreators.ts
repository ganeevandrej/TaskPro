import axios, { AxiosError } from "axios";
import AuthService from "../../../services/AuthService";
import { AppDispatch } from "../../store";
import { userSlice } from "./AuthSlice";
import { Inputs } from "../../../screens/Registration/Form";
import { InputsLogin } from "../../../screens/Login/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { $api, API_URL } from "../../../http";
import { AuthResponse } from "../../../models/response/AuthResponse";
import UserService from "../../../services/UserService";
import { IUser } from "../../../models/IUser";

export interface IResponsDataError {
    message: string
}

export const fetchRegistration = (requestBody: Inputs) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await AuthService.registration(requestBody);
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchLogin = (requestBody: InputsLogin) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await AuthService.login(requestBody);
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await AuthService.logout();
        await AsyncStorage.removeItem('accessToken');
        dispatch(userSlice.actions.logout());
    } catch (error) {
        const e = error as Error;
        dispatch(userSlice.actions.authFetchingError(e.message));
    }
}

export const fetchActivate = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        // const user = await AuthService.registration();
        // dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        const e = error as Error;
        dispatch(userSlice.actions.authFetchingError(e.message));
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        console.log(error)
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export interface ISendAvatarToBackendProprs {
    userId: number,
    uriImage: string
}

export const sendAvatarToBackend = (data: ISendAvatarToBackendProprs) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await UserService.setUserAvatar(data);
        dispatch(userSlice.actions.setUserAvatar(res.body));
    } catch (error) {
        console.log(error);
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const deleteAvatarFromDb = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        await UserService.deleteAvatar(userId);
        dispatch(userSlice.actions.setUserAvatar(''));
    } catch (error) {
        console.log(error);
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const getAvatar = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await UserService.getAvatar(userId);
        dispatch(userSlice.actions.setUserAvatar(res.data));
    } catch (error) {
        console.log(error);
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}