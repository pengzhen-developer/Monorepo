import Vue from 'vue'

// Import Vant UI
// https://youzan.github.io/vant/#/zh-CN/intro
import Vant from 'vant'
import 'vant/lib/icon/local.css'
import 'vant/lib/index.less'
Vue.use(Vant)

const setFlexible = () => {
  // Set Flexible
  // https://github.com/amfe/lib-flexible
  const baseSize = 75
  const maxSize = 75

  // 设置 rem 函数
  function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    const fontSise = baseSize * Math.min(scale, 2)

    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (fontSise > maxSize ? maxSize : fontSise) + 'px'
  }

  // 初始化
  setRem()

  // 改变窗口大小时重新设置 rem
  window.onresize = function() {
    setRem()
  }
}

setFlexible()
