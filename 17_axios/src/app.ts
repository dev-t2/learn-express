import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.get('/air/:location', async (req, res, next) => {
  const { location } = req.params;

  const serviceKey = `serviceKey=${process.env.SERVICE_KEY}`;
  const stationName = `stationName=${encodeURI(location)}`;
  const url = `${process.env.END_POINT}?${serviceKey}&returnType=json&numOfRows=1&pageNo=1&${stationName}&dataTerm=DAILY&ver=1.3`;

  try {
    const { data } = await axios.get(url);
    const { dataTime, pm10Value, pm25Value } = data.response.body.items[0];

    let pm10 = '';
    let pm20 = '';

    if (pm10Value <= 30) {
      pm10 = '좋음😀';
    } else if (pm10Value > 30 && pm10Value <= 80) {
      pm10 = '보통😐';
    } else {
      pm10 = '나쁨😱';
    }

    if (pm25Value <= 15) {
      pm20 = '좋음😀';
    } else if (pm25Value > 15 && pm25Value <= 35) {
      pm20 = '보통😐';
    } else {
      pm20 = '나쁨😱';
    }

    const result = `관측 지역: ${location} / 관측 시간: ${dataTime} / 미세 먼지: ${pm10} / 초미세 먼지: ${pm20}`;

    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});
