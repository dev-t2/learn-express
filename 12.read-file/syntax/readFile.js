const fs = require('fs');

fs.readFile('./syntax/readFile.txt', 'utf8', (err, data) => {
  console.log(data);
});
