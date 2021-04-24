const f1 = () => {
  console.log(1 + 1);
  console.log(1 + 2);
};

console.log(f1);
console.log();

f1();

console.log();

const a = [f1];

a[0]();

console.log();

const o = {
  func: f1,
};

o.func();
