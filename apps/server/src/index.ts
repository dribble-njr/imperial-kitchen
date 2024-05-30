import http, { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';
import 'dotenv/config';

import Router from './router';
import { MiddlewareManager, corsMiddleware } from './middleware';
import { Route } from './types';

/**
 * Execute route's middleware and controller.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Route} route
 */
async function execute(req: IncomingMessage, res: ServerResponse, route: Route) {
  const mwManager = new MiddlewareManager();

  const cors = corsMiddleware({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: false });
  mwManager.use(cors);

  route.middlewares?.forEach((func) => mwManager.use(func));
  mwManager.use(route.controller);
  await mwManager.run(req, res);
}

const notFound: Route = {
  controller: (req, res) => {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html');
    res.write('404 NOT FOUND');
    res.end();
  }
};

http
  .createServer(async (req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const route = Router[req.method + url.pathname] || notFound;
    console.log(req.method, url.pathname, 'route is visited~', route);
    await execute(req, res, route);
  })
  .listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT || 8000}/`);
  });
