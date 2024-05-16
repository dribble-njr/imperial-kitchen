import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
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
