import { Router } from 'express';
import UserRouter from './user-router';
import config from '../config';

const router = Router();

router.use(`${config.API_V1}/users`, new UserRouter().router);

export default router;
