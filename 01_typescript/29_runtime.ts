const callback = () => console.log('setTimeout');

console.log('start');

setTimeout(callback, 0);

console.log('end');
