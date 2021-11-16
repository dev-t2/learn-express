const names = ['개', '고양이'];

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}

console.log();

for (let name of names) {
  console.log(name);
}

console.log();

names.forEach((name) => {
  console.log(name);
});

console.log();

for (let i = 0; i < 10; i++) {
  if (i === 2) {
    continue;
  }

  console.log(i);

  if (i === 5) {
    break;
  }
}
