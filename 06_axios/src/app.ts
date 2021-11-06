import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import redis from 'redis';
import morgan from 'morgan';
import axios from 'axios';

dotenv.config();

const app = express();

const client = redis.createClient();

client.on('error', (error: Error) => {
  console.error(error);
});

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.get('/air/:location', async (req, res, next) => {
  await client.lrange('items', 0, -1, async (error, cachedItems) => {
    if (error) {
      throw error;
    }

    if (cachedItems.length && req.params.location === cachedItems[0]) {
      const location = `관측 지역: ${cachedItems[0]}`;
      const date = `관측 시간: ${cachedItems[1]}`;
      const result1 = `미세 먼지: ${cachedItems[2]}`;
      const result2 = `초미세 먼지:${cachedItems[3]}`;
      const result = `캐시된 데이터: ${location} / ${date} / ${result1} / ${result2}`;

      res.send(result);
    } else {
      const serviceKey = `serviceKey=${process.env.SERVICE_KEY}`;
      const stationName = `stationName=${encodeURI(req.params.location)}`;
      const url = `${process.env.END_POINT}?${serviceKey}&returnType=json&numOfRows=1&pageNo=1&${stationName}&dataTerm=DAILY&ver=1.3`;

      try {
        const { data } = await axios.get(url);
        const { dataTime, pm10Value, pm25Value } = data.response.body.items[0];
        const status = { pm10: '', pm20: '' };

        if (pm10Value <= 30) {
          status.pm10 = '좋음😀';
        } else if (pm10Value > 30 && pm10Value <= 80) {
          status.pm10 = '보통😐';
        } else {
          status.pm10 = '나쁨😱';
        }

        if (pm25Value <= 15) {
          status.pm20 = '좋음😀';
        } else if (pm25Value > 15 && pm25Value <= 35) {
          status.pm20 = '보통😐';
        } else {
          status.pm20 = '나쁨😱';
        }

        const location = `관측 지역: ${req.params.location}`;
        const date = `관측 시간: ${dataTime}`;
        const result1 = `미세 먼지: ${status.pm10}`;
        const result2 = `초미세 먼지:${status.pm20}`;

        client.rpush('items', req.params.location);
        client.rpush('items', dataTime);
        client.rpush('items', status.pm10);
        client.rpush('items', status.pm20);

        client.expire('items', 60 * 60);

        const result = `새로운 데이터: ${location} / ${date} / ${result1} / ${result2}`;

        res.send(result);
      } catch (err) {
        next(err);
      }
    }
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
