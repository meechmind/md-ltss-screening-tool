// eslint.config.js (ESLint v9 flat config)
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,           // supports import attributes, etc.
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true } // ← let ESLint parse JSX
      },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooks,
      'jsx-a11y': jsxA11y
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'jsx-a11y/no-autofocus': 'off'
    }
  }
];