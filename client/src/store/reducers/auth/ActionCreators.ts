import axios, { AxiosError } from "axios";
import AuthService from "../../../services/AuthService";
import { AppDispatch } from "../../store";
import { userSlice } from "./AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../http";
import { AuthResponse } from "../../../models/response/AuthResponse";
import UserService from "../../../services/UserService";
import { Inputs, InputsLogin, InputsUpdateUserInfo } from "../../../components/Forms/models";

export interface IResponsDataError {
    message: string
}

export const fetchRegistration = (requestBody: Inputs) => async (dispatch: AppDispatch) => {
    try {
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
        await AuthService.logout();
        await AsyncStorage.removeItem('accessToken');
        dispatch(userSlice.actions.logout());
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

export const fetchActivate = (code: string) => async (dispatch: AppDispatch) => {
    try {
        await AuthService.activate(code);
        dispatch(userSlice.actions.activate());
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

export const fetchSendLetter = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        await AuthService.sendLetter(userId);
        dispatch(userSlice.actions.activateSuccess());
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

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
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

export interface ISendAvatarToBackendProprs {
    userId: number,
    uriImage: string
}

export const sendAvatarToBackend = (data: ISendAvatarToBackendProprs) => async (dispatch: AppDispatch) => {
    console.log(data);
    try {
        const res = await UserService.uploadAvatar(data);
        dispatch(userSlice.actions.setUserAvatar(res.body));
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

export const deleteAvatarFromDb = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        await UserService.deleteAvatar(userId);
        dispatch(userSlice.actions.setUserAvatar(''));
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

export const getAvatar = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await UserService.getAvatar(userId);
        dispatch(userSlice.actions.setUserAvatar(res.data));
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

export const updateInfo = (body: InputsUpdateUserInfo, userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await UserService.updateInfoUser(body, userId);
        dispatch(userSlice.actions.authFetchingSuccess(res.data));
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