const numbers = [1, 2, 3, 4, 5];
const [one, ...rest] = numbers;

console.log(numbers);
console.log({ one, rest });

const greenCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'green',
};

console.log(greenCuteSlime);

const { color, ...cuteSlime } = greenCuteSlime;

console.log({ color, cuteSlime });

const { attribute, ...slime } = cuteSlime;

console.log({ attribute, slime });
