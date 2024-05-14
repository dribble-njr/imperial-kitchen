import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
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
    ...js.configs.recommended,
    // https://typescript-eslint.io/troubleshooting/#fixing-the-error
    ...ts.configs.disableTypeChecked
  },
  {
    files: ['**/*.ts'],
    ...ts.configs.recommended
  }
];
