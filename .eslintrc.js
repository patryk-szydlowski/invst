/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const internalModules = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name)

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'jest'],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  rules: {
    semi: 'off',
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^react', '^@?\\w'],
          [`^(${internalModules.join('|')})(/.*|$)`],
          ['^\\.'],
        ],
      },
    ],
  },
}
