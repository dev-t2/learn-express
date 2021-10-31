import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import axios from 'axios';

dotenv.config();

const app = express();

const { NODE_ENV, PORT, SERVICE_KEY } = process.env;

app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.get('/air/:location', async (req, res, next) => {
  const { location } = req.params;

  const endPoint = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${SERVICE_KEY}`;
  const url = `${endPoint}&returnType=json&numOfRows=1&pageNo=1&stationName=${encodeURI(
    location
  )}&dataTerm=DAILY&ver=1.3`;

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

    res.send(
      `관측 지역: ${location} / 관측 시간: ${dataTime} / 미세 먼지: ${status.pm10} / 초미세 먼지: ${status.pm20}`
    );
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
