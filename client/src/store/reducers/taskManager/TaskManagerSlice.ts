import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ICategory {
    id: number,
    name: string,
}

export interface ITask {
    id: number,
    name: string,
    priority: string,
    category: string,
    status: string,
    deadline: Date | null,
}

export interface IPriority {
    id: number,
    name: string
}

interface StateTaskManager {
    categories: ICategory[],
    tasks: ITask[],
    priorities: IPriority[],
    isLoading: boolean,
    error: string,
}

const initialState: StateTaskManager = {
    categories: [],
    tasks: [],
    priorities: [],
    isLoading: false,
    error: "",
}

export const taskManagerSlice = createSlice({
    name: 'taskManager',
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true;
        },
        fetchingTasksSuccess(state, action: PayloadAction<ITask[]>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = action.payload;
        },
        addTaskSuccess(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = [action.payload, ...state.tasks];
        },
        addCategorySuccess(state, action: PayloadAction<ICategory>) {
            state.isLoading = false;
            state.error = '';
            state.categories = [action.payload, ...state.categories];
        },
        fetchingCategoriesSuccess(state, action: PayloadAction<ICategory[]>) {
            state.isLoading = false;
            state.error = '';
            state.categories = action.payload;
        },
        updateTasksSuccess(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = state.tasks.map(task => {
                if(task.id === action.payload.id) {
                    return {
                        ...action.payload
                    }
                }
                return task;
            });
        },
        updateTaskStatus(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = state.tasks.map(task => {
                if(task.id === action.payload.id) {
                    return {
                        ...task, status: action.payload.status
                    }
                }
                return task;
            });
        },
        fetchingPrioritiesSuccess(state, action: PayloadAction<IPriority[]>) {
            state.isLoading = false;
            state.error = '';
            state.priorities = action.payload;
        },
        fetchingDeleteTask(state, action: PayloadAction<number>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        fetchingCompleteTask(state, action: PayloadAction<number>) {
            state.isLoading = false;
            state.error = '';
            state.tasks = state.tasks.map(task => {
                if(task.id === action.payload) {
                    return {
                        ...task,
                        status: "Завершена"
                    }
                }
                return task;
            });
        },
        fetchigError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default taskManagerSlice.reducer;