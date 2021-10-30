const numbers = [1, 2, 3, 4, 5, 6, 7];
const [one, ...rest] = numbers;

console.log({ one, rest });

const greenCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'green',
};

const { color, ...cuteSlime } = greenCuteSlime;

console.log({ color, cuteSlime });

const { attribute, ...slime } = cuteSlime;

console.log({ attribute, slime });
