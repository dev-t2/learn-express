const array = [1, 2];
const [a, b, c = 3] = array;

console.log({ a, b, c });

const object = { d: 4, e: 5, f: 6 };
const { d, e = 7, f: g } = object;

console.log({ d, e, g });
