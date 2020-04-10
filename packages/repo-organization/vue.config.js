// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_RELEASE_FLODER_PATH : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: 'static',

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
    config.externals = {
      // e.g.
      // '/public/static/IM/NIM_Web_NIM_v6.5.5': 'NIM',
      // '/public/static/IM/NIM_Web_WebRTC_v6.5.5': 'WebRTC'
    }
  },

  //增加vue.config.js文件配置css
  css: {
    loaderOptions: {
      sass: {
        // @src/ is an alias to src/
        // so this assumes you have a file named `css/variables.scss`
        data: `@import "@src/assets/css/variable.scss";`,
      },

      less: {
        modifyVars: {
          green: '#00C6AE',
          blue: '#00C6AE',
        },
      },

      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: process.env.VUE_APP_PLATFORM === 'mobile' ? 37.5 : 16, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ],
      },
    },
  },
}
