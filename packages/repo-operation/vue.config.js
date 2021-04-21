// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_RELEASE_FLODER_PATH : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: 'static',

  // https://cli.vuejs.org/config/#productionSourceMap
  productionSourceMap: false,

  // https://cli.vuejs.org/config/#chainwebpack
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // 设置别名
    config.resolve.alias
      .set('@', path.join(__dirname, ''))
      .set('@public', path.join(__dirname, 'public'))
      .set('@src', path.join(__dirname, 'src'))
      .set('@library', path.join(__dirname, 'src/library'))
      .set('@views', path.join(__dirname, 'src/views'))
  },

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: (config) => {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    config.externals = {
      ['vue']: 'Vue',
      ['vuex']: 'Vuex',
      ['vue-router']: 'VueRouter',
      ['element-ui']: 'ELEMENT'
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // @src/ is an alias to src/
        // so this assumes you have a file named `css/variables.scss`
        // data: `@import "@src/assets/css/variable.scss";`
      }
    }
  },

  /**
   * THIS IS GENERATED AUTOMATICALLY.
   * DO NOT EDIT.
   */
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: ['quasar']
}
