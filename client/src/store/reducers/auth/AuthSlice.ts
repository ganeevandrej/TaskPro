import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../../models/IUser";

export interface IAnalytics {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

interface UserState {
    user: IUser,
    isAuth: boolean,
    error: string,
    avatar: string,
    analytics: IAnalytics[]
    loading: boolean,
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    error: "",
    avatar: "",
    loading: false,
    analytics: []
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
            state.loading = false;
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        logout(state) {
            state.user = {} as IUser;
            state.isAuth = false;
            state.error = '';
        },
        activate(state) {
            state.user.isActivated = true;
            state.error = '';
            state.loading = false;
        },
        setUserAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
            state.error = '';
            state.loading = false;
        },
        setAnalytics(state, action: PayloadAction<IAnalytics[]>) {
            state.analytics = action.payload;
        },
        loading(state, action: PayloadAction) {
            state.loading = true;
        }
    }
})

export default userSlice.reducer;