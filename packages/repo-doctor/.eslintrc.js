module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
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
