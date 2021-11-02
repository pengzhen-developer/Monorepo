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
    // 移除 prefetch、preload 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compiler = require('vue-template-babel-compiler')
        return options
      })

    // 设置别名
    config.resolve.alias
      .set('@', path.join(__dirname, ''))
      .set('@src', path.join(__dirname, 'src'))
      .set('@public', path.join(__dirname, 'public'))
      .set('@views', path.join(__dirname, 'src/views'))
      .set('@library', path.join(__dirname, 'src/library'))
      .set('@service', path.join(__dirname, 'src/service'))
  },

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: (config) => {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    // externals 配置后，import 将不会被 webpack 编译
    // 相关资源可以通过 CDN 服务器从 index.html 引入, 避免 vendors 过大
    config.externals = {
      ['vue']: 'Vue',
      ['vuex']: 'Vuex',
      ['vue-router']: 'VueRouter',
      ['element-ui']: 'ELEMENT',
      ['jquery']: 'window.$'
    }

    // plugins 请参考 https://webpack.docschina.org/configuration/plugins/
    config.plugins.push(
      new webpack.ProvidePlugin({
        ['$']: 'jquery',
        ['jquery']: 'jquery',
        ['jQuery']: 'jquery',
        ['window.jQuery']: 'jquery'
      })
    )
  },

  css: {
    loaderOptions: {
      sass: {
        // @src/ is an alias to src/
        // so this assumes you have a file named `css/variables.scss`
        // data: `@import "@src/assets/css/variable.scss";`

        // If this option is set to true, Sass won’t print warnings that are caused by dependencies.
        // A “dependency” is defined as any file that’s loaded through a load path or an importer.
        // Stylesheets that are imported relative to the entrypoint are not considered dependencies.

        // This is useful for silencing deprecation warnings that you can’t fix on your own.
        // However, please also notify your dependencies of the deprecations so that they can get fixed as soon as possible!
        quietDeps: true
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

  /**
   * THIS IS GENERATED AUTOMATICALLY.
   * DO NOT EDIT.
   */
  transpileDependencies: ['quasar']
}
