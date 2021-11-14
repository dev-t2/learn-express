const todos = [
  { id: 1, text: 'JavaScript', isDone: true },
  { id: 2, text: 'NodeJS', isDone: true },
  { id: 3, text: 'TypeScript', isDone: true },
  { id: 4, text: 'Express', isDone: false },
];

const isAll = todos.every((todo) => {
  return todo.isDone;
});

console.log(isAll);

const isTrue = todos.some((todo) => {
  return todo.isDone;
});

console.log(isTrue);

const index = todos.findIndex((todo) => {
  return todo.id === 3;
});

console.log(index);

const todo = todos.find((todo) => {
  return todo.id === 3;
});

console.log(todo);
