type Resolve = (value: string) => void;
type Reject = (e: Error) => void;

const delay = (ms: number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    setTimeout(() => {
      resolve('Success');
      // reject(new Error('Error Message'));
    }, ms);
  });
};

const delayFunc = async () => {
  try {
    const result = await delay(3000);

    console.log(result);
  } catch (e) {
    console.error((e as Error).message);
  }
};

delayFunc();
