type Resolve = (value: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, ms);
  });
};

const workFunc = async () => {
  const [date1, date2] = await Promise.all([work(1000), work(2000)]);

  console.log(`첫 번째 작업: ${date1}`);
  console.log(`두 번째 작업: ${date2}`);
};

workFunc();
