import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import bodyParser from 'body-parser';
import * as yaml from 'js-yaml';

import router from './router/index.ts';
import { errorHandlerMiddleware } from './middleware/index.ts';
import { generateHtmlTable } from './util.ts';
import { mergeYamlFiles } from '../openapi/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.json());

// provide the yaml file for redoc to render
app.get('/api-docs/openapi.yaml', async (req, res) => {
  try {
    const mergedYaml = await mergeYamlFiles();
    console.log(yaml.dump(mergedYaml), 'mergedYaml');
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(yaml.dump(mergedYaml));
  } catch (err) {
    console.error('Error merging YAML files:', err);
    res.status(500).send('Error generating OpenAPI document');
  }
});

app.use('/api-docs', (req, res) => {
  res.sendFile(join(__dirname, '../openapi/redoc.html'));
});

app.use('/api', router);

app.use(errorHandlerMiddleware);

app.use('/', (req, res) => {
  const endpoints = listEndpoints(app);
  const htmlTable = generateHtmlTable(endpoints);
  res.send(htmlTable);
});

export default app;
