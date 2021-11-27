type Resolve = (value: string) => void;
type Reject = (error: Error) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    const date = new Date().toISOString();

    setTimeout(() => {
      resolve(date);
      // reject(new Error(`에러 발생: ${date}`));
    }, ms);
  });
};

const main = async () => {
  try {
    const date1 = await work(1000);
    console.log(`첫 번째 작업: ${date1}`);

    const date2 = await work(1000);
    console.log(`두 번째 작업: ${date2}`);
  } catch (e) {
    console.error((e as Error).message);
  }
};

main();
