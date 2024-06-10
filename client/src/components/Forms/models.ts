
export interface InputsLogin {
    email: string;
    password: string;
}

export interface Inputs {
    email: string;
    password: string;
    passwordRepeat: string;
}

export interface InputCreateCategory {
    category: string;
}

export interface InputsUpdateUserInfo {
    phone: string,
    userName:string,
    dataBirth: string,
}

export interface InputsCreateTask {
    name: string,
    priority: number,
    category: number,
    time: Date | null,
    date: Date | null;
}

export interface InputsUpdateTask {
    name: string,
    priority: number,
    category: number,
    time: Date | null,
    date: Date | null;
}

export interface InputsForms {
    status: string,
    priority: number,
    category: number,
}