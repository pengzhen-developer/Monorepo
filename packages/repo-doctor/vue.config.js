// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: process.env.outputDir || 'static',

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: config => {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    config.externals = {
      '/public/static/NIM_Web_SDK/NIM_Web_NIM_v6.5.0': 'NIM',
      '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.5.0': 'WebRTC'
    }
  },

  //增加vue.config.js文件配置css
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/assets/css/element-var.scss";`
      }
    }
  }
}
