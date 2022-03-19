module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  plugins: ['prettier', 'import', 'jsx-a11y', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'no-multiple-empty-lines': ['warn', { 'max': 2, 'maxEOF': 1 }],
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-types': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx', '.js', '.jsx'] }],
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  globals: {
    'window': true,
    'document': true,
    'localStorage': true,
    'FormData': true,
    'FileReader': true,
    'Blob': true,
    'navigator': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  settings: {
    'react': {
      'version': 'detect'
    }
  },
}