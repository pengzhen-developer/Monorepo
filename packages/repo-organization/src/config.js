/**
 * 配置文件
 * 请注意【配置文件】与【环境变量】的使用区别
 * 【环境变量】与【配置文件】不存在包含与被包含的关系，都可以进行条件判断和储值
 * 【环境变量】用来标识在不同服务器环境下变量的异同
 * 【配置文件】用来标识在所有环境下变量的异同
 *
 * 【配置文件】灵活度更高，需要 【导入】 后使用，配置文件的改动会直接生效
 * 【环境变量】可在全局环境下直接使用，环境变量的改动需要重新编译后生效
 */

export default {
  /**
   * 是否开启 vue-page-stack 插件
   * 因 vue page stack 插件存在热更新白屏问题
   * 当调试非 router 问题，可关闭此选项，避免热更新白屏问题
   * 在 App.vue 使用该配置用于快速启停 vue-page-stack
   *
   * 插件使用请参考： https://github.com/hezhongfeng/vue-page-stack
   * 热更新白屏问题请参考： https://github.com/hezhongfeng/vue-page-stack/issues/44
   */
  USE_VUE_PAGE_STACK: false,

  /**
   * 默认系统标题
   */
  DEFAULT_TITLE: '智药云'
}
