const sum = (numbers: number[]) => {
  let result = 0;

  for (let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }

  return result;
};

const result = sum([1, 2, 3, 4, 5]);

console.log(result);
