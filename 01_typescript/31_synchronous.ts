type Callback = (date: string) => void;

const work = (callback: Callback, ms: number) => {
  const date = new Date().toISOString();

  setTimeout(() => {
    callback(date);
  }, ms);
};

work((date) => {
  console.log(`첫 번째 작업: ${date}`);

  work((date) => {
    console.log(`두 번째 작업: ${date}`);
  }, 1000);
}, 1000);