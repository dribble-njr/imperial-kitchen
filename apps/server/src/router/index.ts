import { Router } from 'express';
import UserRouter from './user-router.ts';
import config from '../config/index.ts';

const router = Router();

router.use(`${config.API_V1}/users`, new UserRouter().router);

export default router;
