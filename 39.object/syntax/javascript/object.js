const number = ['t2', 't3', 't4'];

console.log(number[1]);

const roles = { t2: 't2', t3: 't3', t4: 't4' };

console.log(roles.t3);
console.log(roles['t3']);

const { t2, t3, t4 } = roles;

console.log(t3);
