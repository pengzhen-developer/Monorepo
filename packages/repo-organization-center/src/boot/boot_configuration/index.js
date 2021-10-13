export default {
  /**
   * 应用程序设定
   *
   */
  application: {
    title: '机构中心'
  },

  /**
   * 主题设定
   *
   * 可选： #00C6AE / #3099A6 / #1890FF
   */
  theme: {
    primary: '#1890FF'
  },

  /**
   * 布局设定
   *
   * 可选： side / top-side
   */
  layout: {
    type: 'side'
  },

  /**
   * 路由配置
   *
   * webpack 要求明确的后缀文件，以支持 xxx-loader 解析
   * 本项目默认使用 index.js 作为组件入口文件
   * 在 generateRoutes.js 文件中，渲染动态路时，以 `${path}.js` 形式进行异步加载
   * 参考如下声明方式：
   *
   * // >>> index.js
   *
   * // 加载指定 vue 组件
   * // 默认导出 vue 组件
   * import index from './src/index.vue'
   * export default index
   *
   */
  routes: {}
}
