const sum = (...rest: number[]) => {
  return rest.reduce((sum, number) => {
    return sum + number;
  }, 0);
};

const result = sum(1, 2, 3, 4, 5);

console.log(result);
