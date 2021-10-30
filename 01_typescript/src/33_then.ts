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

delay(3000).then(
  (result) => {
    console.log(result);
  },
  (e: Error) => {
    console.error(e.message);
  }
);
