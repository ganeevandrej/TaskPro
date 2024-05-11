import { AxiosError } from "axios";
import { AppDispatch } from "../../store";
import { userSlice } from "../auth/AuthSlice";
import { ICategory, IPriority, taskManagerSlice } from "./TaskManagerSlice";
import { IResponsDataError } from "../auth/ActionCreators";
import TaskManagerService from "../../../services/TaskManagerService";

export interface ICreateTask {
    deadline: string | null,
    userId?: number,
    name: string,
    category: number,
    priority: number,
    createTask?: string,
    status?: string
}

export const fetchCreateTask = (requestBody: ICreateTask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.createTask(requestBody);
        dispatch(taskManagerSlice.actions.addTasksSuccess(res.data));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchUpdateTask = (requestBody: ICreateTask, taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.updateTask(requestBody, taskId);
        dispatch(taskManagerSlice.actions.updateTasksSuccess(res.data));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchCreateCategory = (requestBody: ICreateTask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.createCategory(requestBody);
        dispatch(taskManagerSlice.actions.fetchingCategoriesSuccess(res.data));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchgetTaskManager = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.getTaskManeger(userId);
        dispatch(taskManagerSlice.actions.fetchingCategoriesSuccess(res.categories));
        dispatch(taskManagerSlice.actions.fetchingPrioritiesSuccess(res.priorities));
        dispatch(taskManagerSlice.actions.fetchingTasksSuccess(res.tasks));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchDeleteTask = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        await TaskManagerService.deleteTask(taskId);
        dispatch(taskManagerSlice.actions.fetchingDeleteTask(taskId));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}

export const fetchCompleteTask = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        await TaskManagerService.completeTask(taskId);
        dispatch(taskManagerSlice.actions.fetchingCompleteTask(taskId));
    } catch (error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError<IResponsDataError>;
            const message = axiosError.response?.data.message;
            if (message) {
                dispatch(userSlice.actions.authFetchingError(message));
            }
        }
    }
}