import http, { ServerResponse } from 'node:http';
import { URL } from 'node:url';
import 'dotenv/config';

import Router from './router';
import { MiddlewareManager, corsMiddleware } from './middleware';
import { CustomIncomingMessage, Route } from './types';

/**
 * Execute route's middleware and controller.
 *
 * @param {CustomIncomingMessage} req
 * @param {ServerResponse} res
 * @param {Route} route
 */
async function execute(req: CustomIncomingMessage, res: ServerResponse, route: Route, params: Record<string, string>) {
  const mwManager = new MiddlewareManager();
  req.params = params;

  const cors = corsMiddleware({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: false });
  mwManager.use(cors);

  route.middlewares?.forEach((func) => mwManager.use(func));
  mwManager.use(route.controller);
  await mwManager.run(req, res);
}

/**
 * Matches the provided method and pathname to a route in the Router.
 *
 * @param {string} method - The HTTP method to match.
 * @param {string} pathname - The URL pathname to match.
 * @return {Object} An object containing the matched route and parameters.
 */
const matchRoute = (method: string, pathname: string) => {
  for (const router in Router) {
    const [routeMethod, ...routeParts] = router.split('/');
    if (method === routeMethod) {
      // const routeParts = routePath.split('/');
      const pathParts = pathname.slice(1).split('/');
      console.log(routeMethod, routeParts, pathParts, pathname);

      if (routeParts.length === pathParts.length) {
        const params: Record<string, string> = {};
        let match = true;

        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].slice(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          return { route: Router[router], params };
        }
      }
    }
  }

  return { route: notFound, params: {} };
};

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
    const { route, params } = matchRoute(req.method || '', url.pathname);
    console.log(req.method, url.pathname, 'route is visited~', route, params);
    await execute(req as CustomIncomingMessage, res, route, params);
  })
  .listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT || 8000}/`);
  });
