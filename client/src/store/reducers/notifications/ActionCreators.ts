import { AppDispatch } from "../../store";
import NotificationService from "../../../services/NotificationService";
import { NotificationSlice } from "./NotificationSlice";

export const registerTokenToServer = (userId: number, token: string) => async (dispatch: AppDispatch) => {
    try {
        const body = { userId, token };
        const res = await NotificationService.registerToken(body);
        dispatch(NotificationSlice.actions.registerToken(token));
        dispatch(NotificationSlice.actions.setNotifications(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const getNotifications = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await NotificationService.getNotifications(userId);
        dispatch(NotificationSlice.actions.setNotifications(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const readNotifications = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await NotificationService.readNotifications(userId);
        dispatch(NotificationSlice.actions.setNotifications(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const removeNotification = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await NotificationService.deleteNotification(taskId);
        dispatch(NotificationSlice.actions.deleteNotification(taskId));
    } catch (error) {
        console.log(error);
    }
}