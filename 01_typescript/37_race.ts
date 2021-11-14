type Resolve = (value: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, ms);
  });
};

const workFunc = async () => {
  const date = await Promise.race([work(1000), work(2000)]);

  console.log(`작업: ${date}`);
};

workFunc();
