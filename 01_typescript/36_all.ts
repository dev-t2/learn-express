type Resolve = (value: string) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve) => {
    const date = new Date().toISOString();

    setTimeout(() => {
      resolve(date);
    }, ms);
  });
};

const main = async () => {
  console.time('걸린 시간');

  const [date1, date2] = await Promise.all([work(1000), work(2000)]);

  console.log(`첫 번째 작업: ${date1}`);
  console.log(`두 번째 작업: ${date2}`);

  console.log();
  console.timeEnd('걸린 시간');
};

main();
