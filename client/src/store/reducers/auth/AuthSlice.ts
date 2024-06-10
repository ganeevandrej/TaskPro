import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser,
    isAuth: boolean,
    error: string,
    avatar: string,
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    error: "",
    avatar: ""
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        activateSuccess(state) {
        },
        logout(state) {
            state.user = {} as IUser;
            state.isAuth = false;
            state.error = '';
        },
        activate(state) {
            state.user.isActivated = true;
            state.error = '';
        },
        setUserAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
            state.error = '';
        }
    }
})

export default userSlice.reducer;