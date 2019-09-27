// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? '/h5' : '/h5',
  //assetsPublicPath: '/h5/',
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
      },

      less: {
        modifyVars: {
          green: '#00c6ae',
          blue: '#00c6ae',
        }
      },

      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 换算的基数
            rootValue: 37.5,
            // 忽略转换正则匹配项
            selectorBlackList: [],
            propList: ['*']
          })
        ]
      }
    }
  }
}
