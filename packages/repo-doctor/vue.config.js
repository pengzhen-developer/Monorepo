// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')
const webpack = require('webpack')

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

    config.resolve.alias
      .set('@public', path.join(__dirname, 'public'))
      .set('@src', path.join(__dirname, 'src'))
      .set('@views', path.join(__dirname, 'src/views'))
      .set('@service', path.join(__dirname, 'src/service'))
  },

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    externals: {
      ['vue']: 'Vue',
      ['vuex']: 'Vuex',
      ['vue-router']: 'VueRouter',
      ['element-ui']: 'ELEMENT',
      ['@public/static/js/IM/NIM_Web_NIM_v7.0.0']: 'NIM',
      ['@public/static/js/IM/NIM_Web_WebRTC_v7.0.0']: 'WebRTC'
    },
    plugins: [
      new webpack.ProvidePlugin({
        ['window.Quill']: 'quill/dist/quill.js',
        ['Quill']: 'quill/dist/quill.js'
      })
    ]
  },

  //增加vue.config.js文件配置css
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `css/variables.scss`
        data: `@import "@src/assets/css/variable.scss";`
      }
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: ['quasar']
}
