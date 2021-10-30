const a = 1;

if (a + 1 === 2) {
  console.log('a + 1은 2와 같다.');
}

const b = 10;

if (b > 15) {
  console.log('b가 15보다 크다.');
} else if (b === 10) {
  console.log('b는 10이다.');
} else {
  console.log('b가 15보다 작다.');
}

console.log();

const array = [];

array.length === 0
  ? console.log('배열이 비어 있습니다.')
  : console.log('배열이 비어 있지 않습니다.');
