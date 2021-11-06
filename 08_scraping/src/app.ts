import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

app.set('port', 8080);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.get('/:keyword', async (req, res, next) => {
  const { keyword } = req.params;

  try {
    const { data } = await axios.get(
      `https://book.naver.com/search/search.naver?query=${encodeURI(keyword)}`
    );

    const $ = cheerio.load(data);
    const $list = $('div#content > ul.basic').children('li');

    type Book = {
      name: string;
      url?: string;
    };

    let books: Book[] = [];

    $list.each((index, element) => {
      const name = $(element).find('dl > dt').text().trim();
      const url = $(element).find('dl > dt > a').attr('href');

      books = [...books, { name, url }];
    });

    res.send(books);
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
