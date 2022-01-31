const todos = [
  { id: 1, text: 'JavaScript', isDone: true },
  { id: 2, text: 'TypeScript', isDone: true },
  { id: 3, text: 'NodeJS', isDone: false },
  { id: 4, text: 'Express', isDone: false },
];

const isAllDone = todos.every((todo) => {
  console.log(todo);

  return todo.isDone;
});

console.log(isAllDone);
