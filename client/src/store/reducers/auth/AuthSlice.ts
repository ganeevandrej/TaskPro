import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser,
    isAuth: boolean,
    isLoading: boolean,
    error: string
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: ""
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
        logout(state) {
            state.isLoading = false;
            state.user = {} as IUser;
            state.isAuth = false;
        },
        activate(state) {
            state.user.isActivated = true;
        }
    }
})

export default userSlice.reducer;