import { join } from 'node:path';
import * as yaml from 'js-yaml';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { readFileSync } from 'node:fs';

interface OpenAPISpec {
  paths?: Record<string, unknown>;
  components?: {
    schemas?: unknown;
  };
}

function loadYamlFile(filePath: string) {
  const fullPath = join(__dirname, filePath);
  return yaml.load(readFileSync(fullPath, 'utf8'));
}

export async function mergeYamlFiles() {
  const mainYaml = loadYamlFile('../openapi/openapi.yaml') as OpenAPISpec;
  const parsedYaml = await $RefParser.bundle(mainYaml);
  return parsedYaml;
}
