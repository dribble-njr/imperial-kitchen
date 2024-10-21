import express from 'express';
import router from './router/index.ts';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import { errorHandlerMiddleware } from './middleware/index.ts';

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.use(errorHandlerMiddleware);

console.log(listEndpoints(app));

export default app;
