const sum = (...rest: number[]) => {
  return rest.reduce((sum, number) => {
    return sum + number;
  }, 0);
};

console.log(sum(1, 2, 3, 4, 5));
