const todos = [
  { id: 2, text: 'TypeScript', isDone: true },
  { id: 4, text: 'Express', isDone: false },
  { id: 3, text: 'NodeJS', isDone: false },
  { id: 1, text: 'JavaScript', isDone: true },
];

console.log(todos);

// todos.sort((a, b) => {
//   console.log({ a, b });

//   return a.id - b.id;
// });

// console.log(todos);

const sortedTodos = [...todos].sort((a, b) => a.id - b.id);

console.log(todos);
console.log(sortedTodos);
