export const createTaskDto = (task, categories, priorities) => {
  let formattedDateString = "";
  const category = categories.find(
    (category) => category.id === task.category_id
  );
  const priority = priorities.find(
    (priority) => priority.id === task.priority_id
  );

  if(task.deadline) {
    const dateObject = new Date(task.deadline);
    formattedDateString = dateObject
      .toISOString()
      .split("T")[0]
      .replace("T", " ");
  }  

  return {
    id: task.id,
    name: task.name,
    status: task.status,
    deadline: formattedDateString,
    category: category?.name,
    priority: priority?.name,
  };
};
