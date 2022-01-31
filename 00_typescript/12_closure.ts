const outer = () => {
  const a = 10;

  const inner = () => {
    console.log(a);
  };

  return inner;
};

const outerFunc = outer();

outerFunc();
