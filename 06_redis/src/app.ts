import redis from 'redis';

const client = redis.createClient();

client.on('error', (error: Error) => {
  console.error(error);
});

client.get('key', (err, value) => {
  console.log(value);
});
