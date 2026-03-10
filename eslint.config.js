const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({ baseDirectory: __dirname })

module.exports = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'specs/**',
      'docs-spec/**',
      '.specify/**',
      '.codex/**',
      '*.min.js',
    ],
  },
]
