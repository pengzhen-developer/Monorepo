// 配置请参考 https://cli.vuejs.org/config/#global-cli-config

const path = require('path')
// webpack plugins
const ZopfliPlugin = require('zopfli-webpack-plugin') // zopfli lib Gzip 压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 分析
const { GenerateSW } = require('workbox-webpack-plugin')

const IS_EXPORT_REPORT = process.env.npm_config_report || false // 打包分析: npm run build --report

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_RELEASE_FLODER_PATH : '/',

  // https://cli.vuejs.org/config/#assetsdir
  assetsDir: 'static',

  // https://cli.vuejs.org/config/#productionSourceMap
  productionSourceMap: false,

  // https://cli.vuejs.org/config/#chainwebpack
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@public', path.join(__dirname, 'public'))
      .set('@src', path.join(__dirname, 'src'))
      .set('@views', path.join(__dirname, 'src/views'))
      .set('@service', path.join(__dirname, 'src/service'))
  },

  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: (config) => {
    // externals 请参考 https://webpack.docschina.org/configuration/externals/
    config.externals = {
      '/public/static/IM/NIM_Web_NIM_v6.5.5': 'NIM',
      '/public/static/IM/NIM_Web_WebRTC_v6.5.5': 'WebRTC'
    }

    // 静态配置放在这里
    const plugins = [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ]
    // 编译时 run build
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new ZopfliPlugin({
          asset: '[path].gz[query]',
          algorithm: 'zopfli',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      if (IS_EXPORT_REPORT) {
        plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false
          })
        )
      }
    }
    config.plugins = [...config.plugins, ...plugins]
  },

  //增加vue.config.js文件配置css
  css: {
    loaderOptions: {
      sass: {
        // @src/ is an alias to src/
        // so this assumes you have a file named `css/variables.scss`
        data: `@import "@src/assets/css/variable.scss";`
      },

      less: {
        modifyVars: {
          green: '#00C6AE',
          blue: '#00C6AE'
        }
      },

      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  }
}
