import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
    userReducer,
    form: formReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];