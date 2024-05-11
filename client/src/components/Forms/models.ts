
export interface InputsLogin {
    email: string;
    password: string;
}

export interface Inputs {
    email: string;
    password: string;
    passwordRepeat: string;
}

export interface InputsUpdateUserInfo {
    phone: string,
    userName:string,
    dataBirth: string,
}

type PriorityValueType = 1 | 2 | 3;

export interface InputsCreateTask {
    name: string,
    priority: PriorityValueType,
    category: number,
    time: string,
    date: string;
}