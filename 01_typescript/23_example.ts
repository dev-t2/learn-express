const todos = [
  { id: 1, text: 'JavaScript', isDone: true },
  { id: 2, text: 'TypeScript', isDone: true },
  { id: 3, text: 'NodeJS', isDone: false },
  { id: 4, text: 'Express', isDone: false },
];

const deleteTodo = (id: number) => {
  return todos.filter((todo) => todo.id !== id);
};

const deletedTodos = deleteTodo(1);

console.log(deletedTodos);
