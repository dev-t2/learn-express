const a = () => {
  console.log('A');
};

const slowFunc = callback => {
  callback();
};

slowFunc(a);
