const handler = () => console.log('setTimeout');

console.log('start');

setTimeout(handler, 0);

console.log('end');
