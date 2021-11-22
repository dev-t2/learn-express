const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((sum, number) => {
  return sum + number;
}, 0);

console.log(sum);

const average = numbers.reduce((sum, number, index) => {
  if (index === numbers.length - 1) {
    return (sum + number) / numbers.length;
  }

  return sum + number;
}, 0);

console.log(average);
