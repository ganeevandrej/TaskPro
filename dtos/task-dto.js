export const createTaskDto = (task, categories, priorities) => {
  const category =
    task.category_id === "1"
      ? { name: "Планировщик" }
      : categories.find((category) => category.id === task.category_id);
  const priority = priorities.find(
    (priority) => priority.id === task.priority_id
  );

  return {
    id: task.id,
    name: task.name,
    status: task.status,
    deadline: task.deadline,
    category: category.name,
    priority: priority.name,
  };
};

export const createTaskDtoTechnique = (task, priorities) => {
  const priority = priorities.find(
    (priority) => priority.id === task.priority_id
  );

  return {
    id: task.id,
    title: task.title,
    status: task.status,
    deadline: task.deadline,
    technique: task.technique,
    priority: priority.name,
  };
};
