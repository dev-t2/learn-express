const date1 = new Date();

console.log(date1);
console.log(date1.toString());

console.log();

const date2 = new Date().toISOString();

console.log(date2);
console.log(new Date(date2).getFullYear());
console.log(new Date(date2).getMonth() + 1);
console.log(new Date(date2).getDate());
console.log(new Date(date2).getDay());
console.log(new Date(date2).getHours());
console.log(new Date(date2).getMinutes());
console.log(new Date(date2).getSeconds());

console.log();

const date3 = new Date();
const date4 = new Date('2021-12-06T14:56:42.054Z');

console.log(date3);
console.log(date4);
console.log(date3.getTime() - date4.getTime());
