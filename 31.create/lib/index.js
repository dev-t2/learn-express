const path = require('path');
const fs = require('fs').promises;

const { templateList } = require('../template');

exports.createList = async () => {
  const folderPath = path.join(__dirname, '..', 'data');
  const fileList = await fs.readdir(folderPath);
  const list = templateList({ fileList });

  return { folderPath, list };
};
