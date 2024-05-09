
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

type PriorityValueType = "Высокий" | "Низкий" | "Средний";

export interface InputsCreateTask {
    name: string,
    description:string,
    priority: PriorityValueType,
    category: string,
}