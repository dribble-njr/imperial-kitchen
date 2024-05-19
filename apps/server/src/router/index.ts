/*
 * @Author: yanfan
 * @Date: 2024-05-18 14:05:52
 * @LastEditTime: 2024-05-18 15:33:57
 */
import { CategoryController, UserController } from '../controller';
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
  // 登录
  'POST/user/login': {
    controller: (req, res) => {
      const userController = new UserController();
      userController.login(req, res);
    }
  }
};

export default Router;
