const fs = require('fs').promises;

const folderPath = './data';

const getFiles = async () => {
  const result = await fs.readdir(folderPath);

  console.log(result);
};

getFiles();
