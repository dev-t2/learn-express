const arr = [1, 400, 12, 34, 5, 10000];

arr.map(a => console.log(a));

console.log();

const sum = arr.reduce((sum, a) => sum + a, 0);

console.log(sum);
