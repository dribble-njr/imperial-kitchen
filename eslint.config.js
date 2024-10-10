import js from '@eslint/js';
import ts from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.js'],
    // https://typescript-eslint.io/troubleshooting/#fixing-the-error
    ...ts.configs.disableTypeChecked
  }
];
