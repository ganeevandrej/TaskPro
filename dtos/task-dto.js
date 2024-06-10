export const createTaskDto = (task, categories, priorities) => {
  const category = categories.find(
    (category) => category.id === task.category_id
  );
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
