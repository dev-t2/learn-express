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

  const date = await Promise.race([work(1000), work(2000)]);

  console.log(`완료된 작업: ${date}`);

  console.log();
  console.timeEnd('걸린 시간');
};

main();
