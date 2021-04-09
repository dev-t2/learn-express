const template = title => `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${title ?? 'Welcome'}</title>
  </head>

  <body>
    <h1>
      <a href="/">WEB</a>
    </h1>

    <ul>
      <li>
        <a href="/?id=HTML">HTML</a>
      </li>

      <li>
        <a href="/?id=CSS">CSS</a>
      </li>

      <li>
        <a href="/?id=JavaScript">JavaScript</a>
      </li>
    </ul>

    <h2>${title ?? 'Welcome'}</h2>

    <p>
      HTML elements are the building blocks of HTML pages. With HTML constructs,
      images and other objects, such as interactive forms, may be embedded into
      the rendered page. It provides a means to create structured documents by
      denoting structural semantics for text such as headings, paragraphs,
      lists, links, quotes and other items. HTML elements are delineated by
      tags, written using angle brackets.
    </p>
  </body>
</html>
`;

module.exports = template;
