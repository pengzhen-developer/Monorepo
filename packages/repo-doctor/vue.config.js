// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: 'static',

  // https://cli.vuejs.org/config/#chainwebpack
  chainWebpack: config => {
    config.resolve.alias
      .set('@public', path.join(__dirname, 'public'))
      .set('@src', path.join(__dirname, 'src'))
      .set('@views', path.join(__dirname, 'src/views'))
      .set('@service', path.join(__dirname, 'src/service'))
  },

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: config => {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    config.externals = {
      '/public/static/IM/NIM_Web_NIM_v6.5.5': 'NIM',
      '/public/static/IM/NIM_Web_WebRTC_v6.5.5': 'WebRTC'
    }
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
  }
}
