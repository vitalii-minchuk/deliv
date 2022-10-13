module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    '/@typescript/eslint',
    'plugin:prettier/recommended',
  ],
  parseOption: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
};
