import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { User } from './model';

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.json({ isSuccess: true, users });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      res.json({ isSuccess: true, user });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

interface ICreateUserRequest extends Request {
  body: {
    email: string;
    nickname: string;
  };
}

app.post('/users', async (req: ICreateUserRequest, res) => {
  try {
    const { email, nickname } = req.body;

    const user = new User({ email, nickname });

    await user.save();

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

interface IUpdateUserRequest extends Request {
  params: {
    id: string;
  };
  body: {
    nickname: string;
  };
}

app.put('/users/:id', async (req: IUpdateUserRequest, res) => {
  try {
    const { id } = req.params;
    const { nickname } = req.body;

    const user = await User.findByIdAndUpdate(id, { nickname });

    if (user) {
      res.json({ isSuccess: true });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (user) {
      res.json({ isSuccess: true });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

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

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);

    app.listen(app.get('port'), () => {
      console.log(`Server running at http://localhost:${app.get('port')}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
