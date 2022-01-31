const sum = (...numbers: number[]) => {
  let result = 0;

  numbers.forEach((number) => {
    result += number;
  });

  return result;
};

const result = sum(1, 2, 3, 4, 5);

console.log(result);
