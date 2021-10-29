const numbers = [1, 2, 3, 4, 5];

const result = numbers.reduce((sum, number) => {
  return sum + number;
}, 0);

console.log(result);
