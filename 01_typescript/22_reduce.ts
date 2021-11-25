const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((result, number) => {
  return result + number;
}, 0);

console.log(numbers);
console.log(sum);

const average = numbers.reduce((result, number, index, { length }) => {
  const sum = result + number;

  if (index !== length - 1) {
    return sum;
  }

  return sum / length;
}, 0);

console.log(numbers);
console.log(average);

const result = numbers.reduce((result, number) => {
  return [...result, number];
}, [] as number[]);

console.log(numbers);
console.log(result);
