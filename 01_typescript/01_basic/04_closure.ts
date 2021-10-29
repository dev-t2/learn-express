function outer() {
  const a = 10;

  function inner() {
    console.log(a);
  }

  return inner;
}

const outerFunction = outer();

outerFunction();
