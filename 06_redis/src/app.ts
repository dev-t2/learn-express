import redis from 'redis';

const client = redis.createClient();

client.on('error', (error: Error) => {
  console.error(error);
});

client.set('key', 'value', redis.print);
client.get('key', redis.print);
