type Callback = (date: string) => void;

const work = (callback: Callback, ms: number) => {
  setTimeout(() => {
    callback(new Date().toISOString());
  }, ms);
};

work((date) => {
  console.log(`첫 번째 작업: ${date}`);
}, 1000);

work((date) => {
  console.log(`두 번째 작업: ${date}`);
}, 1000);
