type Resolve = (value: string) => void;
type Reject = (error: Error) => void;

const work = (ms: number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
      // reject(new Error('Error Message'));
    }, ms);
  });
};

const workFunc = async () => {
  try {
    const date1 = await work(1000);
    const date2 = await work(1000);

    console.log(`첫 번째 작업: ${date1}`);
    console.log(`두 번째 작업: ${date2}`);
  } catch (e) {
    console.error((e as Error).message);
  }
};

workFunc();
