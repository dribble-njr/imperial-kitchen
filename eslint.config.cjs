const js = require('@eslint/js');
const ts = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  ...ts.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    }
  },
  {
    files: ['**/*.js'],
    // https://typescript-eslint.io/troubleshooting/#fixing-the-error
    ...ts.configs.disableTypeChecked
  }
];
