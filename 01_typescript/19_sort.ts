const todos = [
  { id: 3, text: 'TypeScript', isDone: true },
  { id: 2, text: 'NodeJS', isDone: true },
  { id: 4, text: 'Express', isDone: false },
  { id: 1, text: 'JavaScript', isDone: true },
];

const sortedTodos = todos.sort((a, b) => a.id - b.id);

console.log(sortedTodos);
