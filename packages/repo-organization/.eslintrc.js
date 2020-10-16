module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  // 尽量避免使用全局变量
  globals: {
    // 框架
    $peace: true,
    Peace: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
