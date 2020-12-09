module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules/**/*.js', 'jest.config.js'],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 0,
    'consistent-return': 0,
  },
};
