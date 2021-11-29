const array = [1, 2];
const [a, b, c = 3] = array;

console.log({ a, b, c });

let [d, e] = array;

console.log({ d, e });

[e, d] = [d, e];

console.log({ d, e });

const object = { f: 4, g: undefined, h: 6 };
const { f, g = 5, h: i } = object;

console.log({ f, g, i });
