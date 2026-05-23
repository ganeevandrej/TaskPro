import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface INotification {
    id: number;
    title: string;
    message: string;
    status: boolean;
    createdAt: Date;
}

export interface NotificationState {
    notifications: INotification[],
    token: string,
}

const initialState: NotificationState = {
    notifications: [] as INotification[],
    token: "",
}

export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        registerToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setNotifications(state, action: PayloadAction<INotification[]>) {
            state.notifications = action.payload;
        },
        deleteNotification(state, action: PayloadAction<number>) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);;
        }
    }
})

export default NotificationSlice.reducer;