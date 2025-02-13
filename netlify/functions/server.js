const jsonServer = require('json-server');
const server = jsonServer.create();
const db = {
  ...require('../db.json'), // Загружаем db.json
  ...require('../words.json') // Загружаем words.json
};
const router = jsonServer.router(db); // Используем объединенные данные
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = server;