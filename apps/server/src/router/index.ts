import { CategoryController, CommodityController, UserController } from '../controller';
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
  },
  'GET/category/create': {
    controller: (req, res) => {
      const categoryController = new CategoryController();
      categoryController.create(req, res);
    }
  },
  'POST/user/sign-in': {
    controller: (req, res) => {
      const userController = new UserController();
      userController.signIn(req, res);
    }
  },
  'POST/commodity/create': {
    controller: (req, res) => {
      const commodityController = new CommodityController();
      commodityController.create(req, res);
    }
  },
  'PUT/commodity/update': {
    controller: (req, res) => {
      const commodityController = new CommodityController();
      commodityController.update(req, res);
    }
  },
  'DELETE/commodity/delete/:id': {
    controller: (req, res) => {
      const commodityController = new CommodityController();
      commodityController.delete(req, res);
    }
  }
};

export default Router;
