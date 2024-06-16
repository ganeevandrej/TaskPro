import { AppDispatch } from "../../store";
import { taskManagerSlice } from "./TaskManagerSlice";
import TaskManagerService from "../../../services/TaskManagerService";
import { InputCreateCategory } from "../../../components/Forms/models";
import { BodyGetTasks } from "../../../screens/Scheduler";

export interface ICreateTask {
    deadline: Date | null,
    userId?: number,
    name: string,
    category: number,
    priority: number,
    createTask: Date,
    status: string
}

export const fetchCreateTask = (requestBody: ICreateTask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.createTask(requestBody);
        dispatch(taskManagerSlice.actions.addTaskSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateTask = (requestBody: ICreateTask, taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.updateTask(requestBody, taskId);
        dispatch(taskManagerSlice.actions.updateTasksSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreateCategory = (requestBody: InputCreateCategory, userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.createCategory(requestBody, userId);
        dispatch(taskManagerSlice.actions.addCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchDeleteCategory = (categoryId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.deleteCategory(categoryId);
        dispatch(taskManagerSlice.actions.deleteCategory(categoryId));
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateCategory = (categoryId: number, name: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.updateCategory(categoryId, name);
        dispatch(taskManagerSlice.actions.updateCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchgetTaskManager = (body: BodyGetTasks) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        const res = await TaskManagerService.getTaskManeger(body);
        dispatch(taskManagerSlice.actions.fetchingCategoriesSuccess(res.categories));
        dispatch(taskManagerSlice.actions.fetchingPrioritiesSuccess(res.priorities));
        dispatch(taskManagerSlice.actions.fetchingTasksSuccess(res.tasks));
    } catch (error) {
        console.log(error);
    }
}

export const fetchDeleteTask = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        await TaskManagerService.deleteTask(taskId);
        dispatch(taskManagerSlice.actions.fetchingDeleteTask(taskId));
    } catch (error) {
        console.log(error);
    }
}

export const fetchCompleteTask = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskManagerSlice.actions.fetching());
        await TaskManagerService.completeTask(taskId);
        dispatch(taskManagerSlice.actions.fetchingCompleteTask(taskId));
    } catch (error) {
        console.log(error);
    }
}