function add1(a: number, b: number) {
  return a + b;
}

console.log(add1(1, 2));

const add2 = (a: number, b: number) => {
  return a + b;
};

console.log(add2(1, 2));

const add3 = (a: number, b: number) => a + b;

console.log(add3(1, 2));

const func = (...args: number[]) => {
  console.log(args);
};

func(1, 2, 3, 4);
