import { create, router as _router, defaults } from 'json-server';
const server = create();
const db = {
  ...require('./db.json'), // Загружаем db.json
  ...require('./words.json') // Загружаем words.json
};
const router = _router(db); // Используем объединенные данные
const middlewares = defaults();

server.use(middlewares);
server.use(router);

export const handler = server;