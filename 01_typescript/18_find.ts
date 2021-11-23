const todos = [
  { id: 1, text: 'JavaScript', isDone: true },
  { id: 2, text: 'TypeScript', isDone: true },
  { id: 3, text: 'NodeJS', isDone: false },
  { id: 4, text: 'Express', isDone: false },
];

const index = todos.findIndex((todo) => {
  console.log(todo);

  return todo.id === 3;
});

console.log(index);

const todo = todos.find((todo) => {
  console.log(todo);

  return todo.id === 3;
});

console.log(todos);
console.log(todo);
