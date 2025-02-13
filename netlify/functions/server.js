const jsonServer = require('json-server');
const server = jsonServer.create();
const db = {
  ...require('../../db.json'), // Загружаем db.json
  ...require('../../words.json') // Загружаем words.json
};
const router = jsonServer.router(db); // Используем объединенные данные
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    server.listen(() => {
      const { url, method, headers, body } = event;
      const req = { url, method, headers, body };
      const res = {
        statusCode: 200,
        setHeader: (name, value) => headers[name] = value,
        end: (data) => resolve({
          statusCode: 200,
          body: data,
          headers
        })
      };

      server.emit('request', req, res);
    });
  });
};