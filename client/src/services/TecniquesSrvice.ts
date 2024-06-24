import { AxiosResponse } from "axios";
import { $api } from "../http";
import { ITaskTechnique } from "../store/reducers/techniques/TechniquesSlice";
import { IBodyCreateTask, IBodyGetTask, IBodyUpdateTask } from "../store/reducers/techniques/ActionCreators";

export default class TechniquesService {
    static async createTask(body: IBodyCreateTask): Promise<AxiosResponse<ITaskTechnique>> {
        return $api.post<ITaskTechnique>(`techniques/tasks/create`, body);
    }

    static async updateTask(body: IBodyCreateTask, taskId: number): Promise<AxiosResponse<ITaskTechnique>> {
        return $api.put<ITaskTechnique>(`techniques/tasks/update/${taskId}`, body);
    }

    static async getTask(body: IBodyGetTask): Promise<AxiosResponse<ITaskTechnique>> {
        const params = {
            ...body
        }
        return $api.get<ITaskTechnique>(`techniques/tasks/${body.userId}`, {params});
    }

    static async getTasks(body: IBodyGetTask): Promise<AxiosResponse<ITaskTechnique[]>> {
        const params = {
            ...body
        }
        return $api.get<ITaskTechnique[]>(`techniques/tasks/all/${body.userId}`, {params});
    }

    static async deleteTask(taskId: number): Promise<AxiosResponse<ITaskTechnique[]>> {
        return $api.delete<ITaskTechnique[]>(`techniques/tasks/delete/${taskId}`);
    }

    static async completeTask(taskId: number): Promise<AxiosResponse<ITaskTechnique>> {
        return $api.put<ITaskTechnique>(`techniques/tasks/complete/${taskId}`);
    }
}