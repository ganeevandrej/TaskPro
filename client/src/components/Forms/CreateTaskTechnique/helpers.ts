import { InputsCreateTask } from "../models";

export const dateTransform = (date: Date, time: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    return new Date(Date.UTC(year, month, day, hour, minutes));
}

export const createBody = ( fields: InputsCreateTask, userId?: number) => {
  const { date, time, name, category, priority } = fields;
    return {
        deadline: date && time ? dateTransform(date, time) : null,
        userId: userId,
        name: name,
        category: category ? category : 1,
        priority: priority ? priority : 1,
        createTask: new Date(),
        status: "Активная",
      };
}