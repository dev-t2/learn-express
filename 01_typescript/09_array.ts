const array = [10, 20, 30, 40];

console.log('===== Read and Search Element =====');
console.log(array);
console.log(array[1]);
console.log(array.length);
console.log(array.indexOf(20));
console.log(array.includes(30));
console.log();

console.log('===== Left Insert and Delete =====');
console.log(array.unshift(5));
console.log(array);
console.log(array.shift());
console.log(array);
console.log();

console.log('===== Right Insert and Delete =====');
console.log(array.push(50));
console.log(array);
console.log(array.pop());
console.log(array);
console.log();

console.log('===== Delete Element =====');
console.log(array.slice(1, 2));
console.log(array);
console.log(array.splice(1, 1));
console.log(array);
console.log();

console.log('===== Change Array to String =====');
console.log(array.join());
console.log(array.join(' '));
