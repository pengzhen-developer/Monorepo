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
    // externals 配置后，import 将不会被 webpack 编译
    // 相关资源可以通过 CDN 服务器从 index.html 引入, 避免 vendors 过大
    config.externals = {
      // e.g.
      // ['vue']: 'Vue',
      // ['element-ui']: 'ELEMENT',
      ['vue']: 'Vue',
      ['element-ui']: 'ELEMENT',
      ['@public/static/IM/NIM_Web_NIM_v7.0.0']: 'NIM',
      ['@public/static/IM/NIM_Web_WebRTC_v7.0.0']: 'WebRTC'
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
