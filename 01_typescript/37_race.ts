type Resolve = (date: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString();

      resolve(now);
    }, ms);
  });
};

const main = async () => {
  console.time('걸린 시간');

  const startTime = new Date().toISOString();

  console.log(`시작 시간: ${startTime}`);
  console.log();

  const date = await Promise.race([work(1000), work(2000)]);

  console.log(`완료된 작업: ${date}`);

  console.log();
  console.timeEnd('걸린 시간');
};

main();
