class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const createToDo = (title, description, dueDate, priority) => {
  const task = new Todo(title, description, dueDate, priority);
  return task;
};

const removeTodo = (array, taskId) => {
  array.splice(taskId, 1);
};

const editTodo = (task, title, description, dueDate, priority) => {
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.priority = priority;
};

export {
  createToDo,
  removeTodo,
  editTodo,
};
