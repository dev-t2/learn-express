type Resolve = (value: string) => void;
type Reject = (error: Error) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    setTimeout(() => {
      const now = new Date().toISOString();

      resolve(now);
      // reject(new Error('Error Message'));
    }, ms);
  });
};

const main = async () => {
  try {
    const date1 = await work(1000);
    console.log(`첫 번째 작업: ${date1}`);

    const date2 = await work(1000);
    console.log(`두 번째 작업: ${date2}`);
  } catch (err) {
    console.error(err);
  }
};

console.log('start');

main();

console.log('end');
