import { IncomingMessage, ServerResponse } from 'node:http';
import { CategoryController } from '../controller';
import { Route } from '../types';

/**
 * Distribute controller for different route.
 */
const Router: { [key: string]: Route } = {
  'GET/': {
    controller: (req, res) => {
      res.setHeader('content-type', 'text/html');
      res.write('Hello World!');
      res.end();
    }
  },
  'GET/category/list': {
    controller: (req, res) => {
      const categoryController = new CategoryController();
      categoryController.list(req, res);
    }
  }
};

export default Router;
