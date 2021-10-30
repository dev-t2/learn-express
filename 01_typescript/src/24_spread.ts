const animals = ['개', '고양이'];
const updatedAnimals = [...animals, '거북이'];

console.log(animals);
console.log(updatedAnimals);

console.log();

const numbers = [1, 2, 3, 4, 5];
const updatedNumbers = [...numbers, 1000, ...numbers];

console.log(numbers);
console.log(updatedNumbers);

console.log();

const slime = { name: '슬라임' };
const cuteSlime = { ...slime, attribute: '귀여움' };
const greenCuteSlime = { ...cuteSlime, color: '초록색' };

console.log(slime);
console.log(cuteSlime);
console.log(greenCuteSlime);
