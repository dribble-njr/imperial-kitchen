import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as yaml from 'js-yaml';
import $RefParser from '@apidevtools/json-schema-ref-parser';

interface OpenAPISpec {
  paths?: Record<string, unknown>;
  components?: {
    schemas?: unknown;
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadYamlFile(filePath: string) {
  const fullPath = join(__dirname, filePath);
  return yaml.load(fs.readFileSync(fullPath, 'utf8'));
}

export async function mergeYamlFiles() {
  const mainYaml = loadYamlFile('../openapi/openapi.yaml') as OpenAPISpec;
  const parsedYaml = await $RefParser.bundle(mainYaml);
  return parsedYaml;
}
