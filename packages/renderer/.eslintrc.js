module.exports = {
  env: {
    browser: true,
    node: false,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'esnext',
  },
  extends: ['plugin:vue/vue3-recommended'],
  // https://eslint.vuejs.org/rules/
  rules: {
    'vue/no-unused-vars': 'error',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/component-api-style': ['error', ['script-setup']],
    semi: ['error', 'always'],
  },
  ignorePatterns: [
    'node_modules/**',
    'vite.config.ts',
  ],
}
