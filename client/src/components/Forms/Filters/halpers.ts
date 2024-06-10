import { ICategory, IPriority } from "../../../store/reducers/taskManager/TaskManagerSlice";

export const arrayTransformSelect = (arr: ICategory[] | IPriority[]) => {
    return arr.map((item) => {
        return {
            label: item.name,
            value: item.id,
            key: item.id,
        };
    });
}

export const findItemIdByName = (arr: ICategory[] | IPriority[], name: string) => {
    const item = arr.find(item => item.name === name);
    return item ? item.id : 0;
}