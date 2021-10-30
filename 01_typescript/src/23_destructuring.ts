const array = [1, 2];

const [first, second] = array;

console.log(first);
console.log(second);

console.log();

const object = { a: 1, b: 2 };
const { a, b = 2 } = object;

console.log(a);
console.log(b);
