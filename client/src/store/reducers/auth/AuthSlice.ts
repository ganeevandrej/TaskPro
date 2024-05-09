import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser,
    isAuth: boolean,
    isLoading: boolean,
    error: string,
    avatar: string
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: "",
    avatar: ""
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetching(state) {
            state.isLoading = true;
        },
        authFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        activateSuccess(state) {
            state.isLoading = false;
        },
        logout(state) {
            state.isLoading = false;
            state.user = {} as IUser;
            state.isAuth = false;
            state.error = '';
            state.avatar = '';
        },
        activate(state) {
            state.isLoading = false;
            state.user.isActivated = true;
            state.error = '';
        },
        setUserAvatar(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.avatar = action.payload;
            state.error = '';
        }
    }
})

export default userSlice.reducer;