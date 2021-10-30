type Resolve = (value: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, ms);
  });
};

work(1000)
  .then((date) => {
    console.log(`첫 번째 작업: ${date}`);

    return work(1000);
  })
  .then((date) => {
    console.log(`두 번째 작업: ${date}`);

    return work(1000);
  })
  .then((date) => {
    console.log(`세 번째 작업: ${date}`);
  });
