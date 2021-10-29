const todos = [
  { id: 1, text: 'JavaScript', isDone: true },
  { id: 2, text: 'NodeJS', isDone: true },
  { id: 3, text: 'TypeScript', isDone: true },
  { id: 4, text: 'Express', isDone: false },
];

const filteredTodos = todos.filter((todo) => {
  return todo.isDone;
});

console.log(filteredTodos);
