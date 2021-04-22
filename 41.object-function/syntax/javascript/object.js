const number = ['t2', 't3', 't4'];

console.log(number[1]);

number.map(n => console.log(`array loop ${n}`));

const roles = { t2: 't2', t3: 't3', t4: 't4' };

console.log(roles.t3);
console.log(roles['t3']);

Object.keys(roles).map(value => console.log(`object key ${value}`));
Object.values(roles).map(value => console.log(`object value ${value}`));
Object.entries(roles).map(([key, value]) =>
  console.log(`object key ${key}, value ${value}`)
);

const { t2, t3, t4 } = roles;

console.log(t3);
