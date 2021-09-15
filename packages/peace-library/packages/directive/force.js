export default {
  name: 'force',

  /**
   * e.g v-force="'pInterger'"
   * @param {type} String  pInterger | nInterger
   */
  bind: function(el, type) {
    let $input = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')

    el.$input = $input

    // 键盘点击事件回调
    $input.handle = function() {
      if (event.keyCode !== 8) {
        let canInput = false

        // 校验按键
        if (type.value === 'pInterger') {
          // 不终止粘贴事件，由 handlePaste 处理
          if (event.metaKey || event.ctrlKey) {
            canInput = true
          } else {
            canInput = /[\d]/.test(String.fromCharCode(event.keyCode))
          }
        } else if (type.value === 'nInterger') {
          if (event.metaKey || event.ctrlKey) {
            canInput = true
          } else {
            if ($input.value.length == 0) {
              // 第一位输入必须是 '-'
              canInput = event.key === '-'
            } else {
              // 除第一位外不能输入 '-'
              canInput = event.key === '-' ? false : /[\d]/.test(String.fromCharCode(event.keyCode))
            }
          }
        } else {
          throw new Error('v-force type is required (pInterger | nInterger)')
        }

        if (!canInput) {
          event.preventDefault()
        }
      }
    }

    // 粘贴事件回调
    $input.handlePaste = function() {
      // 获取解析 粘贴的文本
      let text = (event.clipboardData || window.clipboardData).getData('text')

      // 验证粘贴的文本
      if (type.value === 'pInterger') {
        if (!/^[1-9]\d*$/.test(text)) {
          event.preventDefault()
        }
      } else if (type.value === 'nInterger') {
        if (!/^((-\d+)|(0+))$/.test(text)) {
          event.preventDefault()
        }
      }
    }

    // 中文输入法状态输入结束事件回调
    $input.handleComposition = function() {
      // 或者本次输入法输入的文字
      const text = event.data

      // 校验本次输入数据，执行删除操作
      if (type.value === 'pInterger') {
        if (!/^[1-9]\d*$/.test(text)) {
          el.$input.value = el.$input.value.replace(text, '')
        }
      } else if (type.value === 'nInterger') {
        if (!/^((-\d+)|(0+))$/.test(text)) {
          el.$input.value = el.$input.value.replace(text, '')
        }
      }
    }

    // 监听粘贴事件
    $input.addEventListener('paste', $input.handlePaste)
    // 监听按键点击事件
    $input.addEventListener('keydown', $input.handle)
    // 监听中文输入法结束
    $input.addEventListener('compositionend', $input.handleComposition)
  },

  unbind: function(el) {
    el.$input.removeEventListener('keydown', el.$input.handle)
    el.$input.removeEventListener('paste', el.$input.handlePaste)
    el.$input.removeEventListener('compositionend', el.$input.handleComposition)
  }
}
