import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  eslintPluginPrettier,
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:react/recommended'),
  ...compat.config({
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'eslint-plugin-import-helpers'],
    rules: {
      '@next/next/no-img-element': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 95,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          singleQuote: true,
          bracketSpacing: true,
        },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['/^react/', 'module', '/^@/app/', '/^@/', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  }),
];

export default eslintConfig;
