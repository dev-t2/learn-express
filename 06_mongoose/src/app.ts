import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { IUser, User } from './model/user';

const main = async () => {
  const app = express();

  app.set('port', process.env.PORT ?? 3000);

  try {
    await mongoose.connect(process.env.DB_URI!);

    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
    app.use(express.json());

    app.get('/', (req, res) => {
      res.send('Hello Express');
    });

    app.post('/users', async (req, res) => {
      const { email, username } = req.body as IUser;

      try {
        const user = new User({ email, username });

        await user.save();

        res.json({ isSuccess: true, user });
      } catch (err) {
        res.json({ isSuccess: false });
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
      console.log(`Server running at http://localhost:${app.get('port')}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
