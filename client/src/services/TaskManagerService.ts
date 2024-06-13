import axios, { AxiosPromise, AxiosResponse } from "axios";
import { $api } from "../http";
import { ICategory, IPriority, ITask } from "../store/reducers/taskManager/TaskManagerSlice";
import { ICreateTask } from "../store/reducers/taskManager/ActionCreators";
import { InputCreateCategory } from "../components/Forms/models";
import { BodyGetTasks } from "../screens/Scheduler";

export default class TaskManagerService {
    static async createTask(body: ICreateTask): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>(`/tasks/new`, body);
    }

    static async updateTask(body: ICreateTask, taskId: number): Promise<AxiosResponse<ITask>> {
        return $api.put<ITask>(`/tasks/update/${taskId}`, body);
    }

    static async createCategory({ category }: InputCreateCategory, userId: number): Promise<AxiosResponse<ICategory>> {
        const body = { nameCategory: category, userId }
        return $api.post<ICategory>("/categories/new", body);
    }

    static async deleteTask(taskId: number): Promise<void> {
        return $api.delete(`/tasks/delete/${taskId}`);
    }

    static async completeTask(taskId: number): Promise<void> {
        return $api.put(`/tasks/complete/${taskId}`);
    }

    static async getTaskManeger(body: BodyGetTasks) {
        const [categoriesResult, prioritiesResult, tasksResult] = 
            await axios.all([
                this.getCategories(body.userId), 
                this.getPriorities(), 
                this.getTasks(body)
            ]) as unknown as [
                AxiosResponse<ICategory[]>, 
                AxiosResponse<IPriority[]>, 
                AxiosResponse<ITask[]>
            ];

        return {
            tasks: tasksResult.data,
            categories: categoriesResult.data,
            priorities: prioritiesResult.data
        }
    }

    static async getTasks({ userId, sort, filters, search }: BodyGetTasks): Promise<AxiosResponse<ITask[]>> {
        let query = `/tasks/all/${userId}`;

        const params = {
            filters,
            search,
            sort,
        }

        return $api.get<ITask[]>(query, { params });
    }

    static async getCategories(userId: number): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>(`/categories/all?userId=${userId}`);
    }

    static async getPriorities(): Promise<AxiosResponse<IPriority[]>> {
        return $api.get<IPriority[]>(`/tasks/priorities/all`);
    }
}