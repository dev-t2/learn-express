// const fs = require('fs').promises;

// const readFile = async () => {
//   console.log('A');

//   const result = await fs.readFile('syntax/nodejs/sample.txt', {
//     encoding: 'utf-8',
//   });

//   console.log(result);
//   console.log('C');
// };

// readFile();

const fs = require('fs');

console.log('A');

fs.readFile('syntax/nodejs/sample.txt', { encoding: 'utf-8' }, (_, result) => {
  console.log(result);
});

console.log('C');
