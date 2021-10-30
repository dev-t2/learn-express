type Reject = (e: Error) => void;

const delay = (ms: number) => {
  return new Promise((resolve, reject: Reject) => {
    setTimeout(() => {
      reject(new Error('Error Message'));
    }, ms);
  });
};

delay(3000).catch((e: Error) => {
  console.error(e.message);
});
