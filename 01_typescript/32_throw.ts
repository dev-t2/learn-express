const inner = () => {
  console.log('Inner Function Start');

  throw new Error('Error Message');

  console.log('Inner Function End');
};

const outer = () => {
  console.log('Outer Function Start');

  try {
    inner();
  } catch (e) {
    console.error((e as Error).message);
  }

  console.log('Outer Function End');
};

outer();
