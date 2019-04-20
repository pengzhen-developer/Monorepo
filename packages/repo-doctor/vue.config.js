// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? '' : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: 'static'
}
