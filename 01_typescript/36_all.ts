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

  const [date1, date2] = await Promise.all([work(1000), work(2000)]);

  console.log(`첫 번째 작업: ${date1}`);
  console.log(`두 번째 작업: ${date2}`);

  console.log();
  console.timeEnd('걸린 시간');
};

main();
