module.exports = {
  presets: ['@vue/app'],

  // 移除 NPM_WEB_SDK 的编译, 避免 2 次编译引发的异常问题
  exclude: /NIM_Web_SDK.*\.js/
}
