import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth/AuthSlice';
import taskManagerReducer from "./reducers/taskManager/TaskManagerSlice";
import techniquesManagerReducer from "./reducers/techniques/TechniquesSlice";
import notificationReducer from "./reducers/notifications/NotificationSlice";;

const rootReducer = combineReducers({
    authReducer,
    taskManagerReducer,
    notificationReducer,
    techniquesManagerReducer
});

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;