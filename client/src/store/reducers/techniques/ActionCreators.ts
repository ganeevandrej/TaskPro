import TechniquesService from "../../../services/TecniquesSrvice";
import { AppDispatch } from "../../store";
import { TechniquesSlice } from "./TechniquesSlice";

export interface IBodyCreateTask {
    userId?: number,
    title: string,
    technique: string,
    status: string,
    priority: number;
    deadline: Date | null;
}

export interface IBodyUpdateTask {
    id: number,
    title: string,
    technique: string,
}

export interface IBodyGetTask {
    userId: number,
    technique: string,
}

export const getTaskTechniques = (body: IBodyGetTask) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.getTask(body);
        dispatch(TechniquesSlice.actions.getTask(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const getTasksMethod = (body: IBodyGetTask) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.getTasks(body);
        dispatch(TechniquesSlice.actions.getTasks(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const createTaskTechniques = (body: IBodyCreateTask) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.createTask(body);
        dispatch(TechniquesSlice.actions.createTask(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const updateTaskTechniques = (body: IBodyCreateTask, taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.updateTask(body, taskId);
        dispatch(TechniquesSlice.actions.updateTask(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const completeTaskTechniques = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.completeTask(taskId);
        dispatch(TechniquesSlice.actions.completeTask(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const deleteTaskMetchod = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.deleteTask(taskId);
        dispatch(TechniquesSlice.actions.deleteTask(taskId));
    } catch (error) {
        console.log(error);
    }
}

export const deleteTaskPomodoro = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.deleteTask(taskId);
        dispatch(TechniquesSlice.actions.deleteTaskPomodoro(taskId));
    } catch (error) {
        console.log(error);
    }
}

export const deleteTaskFlog = (taskId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TechniquesService.deleteTask(taskId);
        dispatch(TechniquesSlice.actions.deleteTaskFlog(taskId));
    } catch (error) {
        console.log(error);
    }
}