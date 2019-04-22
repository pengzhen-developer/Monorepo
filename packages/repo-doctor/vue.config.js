// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: process.env.outputDir
}
