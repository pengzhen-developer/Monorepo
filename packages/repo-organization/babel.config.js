module.exports = {
  // Support optional and nullish
  // E.g.
  // const a = { b: 1 }
  // console.log(a?.b) => 1
  // console.log(a?.c) => undefined
  // console.log(a?.c ?? '无') => 无
  plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
  presets: ['@vue/cli-plugin-babel/preset'],
}
