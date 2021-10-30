const array = [1, 2];

const [first, second, third = 3] = array;

console.log(first);
console.log(second);
console.log(third);

console.log();

const object = { a: 1, b: 2, c: 3 };
const { a, b = 2, c: d } = object;

console.log(a);
console.log(b);
console.log(d);
