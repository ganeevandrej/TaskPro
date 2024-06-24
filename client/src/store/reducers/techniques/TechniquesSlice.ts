import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ITaskTechnique {
    id: number;
    title: string;
    status: string;
    technique: string;
    priority: string;
    deadline: Date;
}

export interface TechniquesState {
    taskFlog: ITaskTechnique,
    taskPomodoro: ITaskTechnique,
    tasks: ITaskTechnique[],
    loading: boolean,
}

const initialState: TechniquesState = {
    taskFlog: {} as ITaskTechnique,
    taskPomodoro: {} as ITaskTechnique,
    tasks: [],
    loading: false,
}

export const TechniquesSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        createTask(state, action: PayloadAction<ITaskTechnique>) {
            if(action.payload.technique === "Eat That Flog") {
                state.taskFlog = action.payload;
            }
            if(action.payload.technique === "Pomodoro") {
                state.taskPomodoro = action.payload;
            }
            if(action.payload.technique === "Method") {
                state.tasks = [...state.tasks, {...action.payload}];
            }
            state.loading = false;
        },
        updateTask(state, action: PayloadAction<ITaskTechnique>) {
            if(action.payload.technique === "Eat That Flog") {
                state.taskFlog = action.payload;
            }
            if(action.payload.technique === "Pomodoro") {
                state.taskPomodoro = action.payload;
            }
            if(action.payload.technique === "Method") {
                state.tasks = state.tasks.map(task => {
                    if(task.id === action.payload.id) {
                        return action.payload;
                    }
                    return task;
                });
            }
        },
        completeTask(state, action: PayloadAction<ITaskTechnique>) {
            if(action.payload.technique === "Eat That Flog") {
                state.taskFlog = action.payload;
            }
            if(action.payload.technique === "Pomodoro") {
                state.taskPomodoro = action.payload;
            }
            if(action.payload.technique === "Method") {
                state.tasks = state.tasks.map(task => {
                    if(task.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return task;
                    }
                });
            }
        },
        getTask(state, action: PayloadAction<ITaskTechnique>) {
            if(action.payload.technique === "Eat That Flog") {
                state.taskFlog = action.payload;
            }
            if(action.payload.technique === "Pomodoro") {
                state.taskPomodoro = action.payload;
            }
            state.loading = false;
        },
        getTasks(state, action: PayloadAction<ITaskTechnique[]>) {
            state.tasks = action.payload;
            state.loading = false;
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            state.loading = false;
        },
        deleteTaskFlog(state, action: PayloadAction<number>) {
            state.taskFlog = {} as ITaskTechnique;
            state.loading = false;
        },
        deleteTaskPomodoro(state, action: PayloadAction<number>) {
            state.taskPomodoro = {} as ITaskTechnique;
            state.loading = false;
        },
    }
})

export default TechniquesSlice.reducer;