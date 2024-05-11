import axios, { AxiosPromise, AxiosResponse } from "axios";
import { $api } from "../http";
import { ICategory, IPriority, ITask } from "../store/reducers/taskManager/TaskManagerSlice";
import { ICreateTask } from "../store/reducers/taskManager/ActionCreators";
import { InputCreateCategory } from "../components/Forms/models";

export default class TaskManagerService {
    static async createTask(body: ICreateTask): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>(`/user/tasks/new`, body);
    }

    static async updateTask(body: ICreateTask, taskId: number): Promise<AxiosResponse<ITask>> {
        return $api.put<ITask>(`/user/tasks/${taskId}/update`, body);
    }

    static async createCategory({category}: InputCreateCategory, userId: number): Promise<AxiosResponse<ICategory>> {
        const body = { nameCategory: category, userId }
        return $api.post<ICategory>("/user/categories/new", body);
    }

    static async deleteTask(taskId: number): Promise<void> {
        return $api.delete(`/user/tasks/${taskId}/delete`);
    }

    static async completeTask(taskId: number): Promise<void> {
        return $api.put(`/user/tasks/${taskId}/complete`);
    }

    static async getTaskManeger(userId: number) {
        const [categoriesResult, prioritiesResult, tasksResult] = await axios.all([this.getCategories(userId), this.getPriorities(), this.getTasks(userId)]) as unknown as [AxiosResponse<ICategory[]>, AxiosResponse<IPriority[]>, AxiosResponse<ITask[]>];

        return {
            tasks: tasksResult.data,
            categories: categoriesResult.data,
            priorities: prioritiesResult.data
        }
    }

    static async getTasks(userId: number): Promise<AxiosResponse<ITask[]>> {
        return $api.get<ITask[]>(`/user/${userId}/tasks/all`);
    }

    static async getCategories(userId: number): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>(`/user/${userId}/categories/all`);
    }

    static async getPriorities(): Promise<AxiosResponse<IPriority[]>> {
        return $api.get<IPriority[]>(`/user/priorities/all`);
    }
}