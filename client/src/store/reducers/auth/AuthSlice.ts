import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser,
    isLoading: boolean,
    error: string
}

const initialState: UserState = {
    user: {} as IUser,
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
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = {} as IUser;
        },
        activate(state) {
            state.user.isActivated = true;
        }
    }
})

export default userSlice.reducer;