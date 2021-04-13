const template = ({ title, list, description }) => `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${title}</title>
  </head>

  <body>
    <h1>
      <a href="/">WEB</a>
    </h1>

    <ul>
      ${list
        .map(li => {
          const name = li.split('.')[0];

          return `<li><a href="/?id=${name}">${name}</a></li>`;
        })
        .join('')}
    </ul>

    <h2>${title}</h2>

    <p>
      ${description}
    </p>
  </body>
</html>
`;

module.exports = template;
