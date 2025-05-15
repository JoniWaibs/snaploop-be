import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// Importar el plugin para ordenamiento de imports

export default [
  // Configuración básica para JavaScript
  js.configs.recommended,

  // Configuración de globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Configuración de TypeScript
  ...tseslint.configs.recommended,

  // Configuración adicional para TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Node.js y módulos externos (como Fastify)
            'internal', // Plugins de Fastify
            ['parent', 'sibling'], // Importaciones relativas
            'index', // Importaciones del mismo directorio
            'object', // Importaciones de objetos
            'type', // Importaciones de tipos
          ],
          pathGroups: [
            // Prioridad para Fastify
            { pattern: 'fastify*', group: 'builtin', position: 'before' },
            // Plugins Fastify
            { pattern: '@fastify/**', group: 'internal' },
            // Alias locales organizados alfabéticamente
            { pattern: '@**', group: 'parent', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['fastify'],
          'newlines-between': 'always', // Espacios entre grupos de imports
          alphabetize: {
            order: 'asc', // Orden alfabético
            caseInsensitive: true, // No distinguir mayúsculas/minúsculas
          },
        },
      ],
    },
  },

  // Ignorar archivos de cobertura
  {
    ignores: ['coverage/**'],
  },

  // Prettier debe ser el último para evitar conflictos
  prettierConfig,
];
