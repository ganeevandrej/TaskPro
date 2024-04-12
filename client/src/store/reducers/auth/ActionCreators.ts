import { AxiosError } from "axios";
import AuthService from "../../../services/AuthService";
import { AppDispatch } from "../../store";
import { userSlice } from "./AuthSlice";

interface IResponsDataError {
    message: string
}

export const fetchRegistration = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await AuthService.registration(email, password);
        dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if(message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchLogin = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const res = await AuthService.login(email, password);
        dispatch(userSlice.actions.authFetchingSuccess(res.data.user));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if(message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.authFetching());
        const user = await AuthService.logout();
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