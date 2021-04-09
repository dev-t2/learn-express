const fs = require('fs').promises;

const getData = async () => {
  const data = await fs.readFile('./syntax/readFile.txt', {
    encoding: 'utf-8',
  });

  console.log(data);
};

getData();
