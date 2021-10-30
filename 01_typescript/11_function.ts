function func1(a: number, b: number) {
  return a + b;
}

console.log(func1(1, 2));

const func2 = (a: number, b: number) => {
  return a + b;
};

console.log(func2(1, 2));

const func3 = (a: number, b: number) => a + b;

console.log(func3(1, 2));

const func4 = (a: number = 2) => a * a;

console.log(func4(2));
console.log(func4());

const func5 = (...args: number[]) => {
  console.log(args);
};

func5(1, 2, 3, 4);
