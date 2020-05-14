module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-prototype-builtins': 'off'
  },
  globals: {
    // 尽量避免使用全局变量
    $peace: true,
    dayjs: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
