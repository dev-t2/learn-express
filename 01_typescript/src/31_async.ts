type Resolve = (date: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, ms);
  });
};

const workFunc = async () => {
  const date1 = await work(1000);

  console.log(`첫 번째 작업: ${date1}`);

  const date2 = await work(1000);

  console.log(`두 번째 작업: ${date2}`);

  const date3 = await work(1000);

  console.log(`세 번째 작업: ${date3}`);
};

workFunc();
