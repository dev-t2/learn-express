interface IMovie {
  title: string;
  link: string;
  score: number;
}

const movies: IMovie[] = [
  {
    title: '장르만 로맨스',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=185264',
    score: 0,
  },
  {
    title: '이터널스',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=184311',
    score: 0,
  },
  {
    title: '프렌치 디스패치',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=187312',
    score: 0,
  },
  {
    title: '너에게 가는 길',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=203715',
    score: 0,
  },
  {
    title: '듄',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=191559',
    score: 0,
  },
];

export default movies;
