import { createHOC } from 'vue-hoc'
import { Dialog } from 'element-ui'

const options = {
  name: 'PeaceDialog',

  props: {
    ['top']: {
      type: String,
      default() {
        return '10vh'
      }
    },

    ['close-on-click-modal']: {
      type: Boolean,
      default() {
        return false
      }
    },

    ['close-on-press-escape']: {
      type: Boolean,
      default() {
        return true
      }
    },

    ['width']: {
      type: String,
      default() {
        return '600px'
      }
    }
  },

  mounted() {
    // 模拟 footer 插槽，优化 dialog 组件内的 footer 交互
    this.$nextTick(() => {
      const dialog = this.$el.querySelector('.el-dialog')
      const oldBody = dialog.querySelector('.el-dialog__body')
      const newBody = dialog.querySelector('.el-dialog__body .el-dialog__body')
      const footer = dialog.querySelector('.el-dialog__body .el-dialog__footer')

      dialog.append(footer)
      dialog.replaceChild(newBody, oldBody)
    })
  }
}

const renderWith = {}

export default createHOC(Dialog, options, renderWith)
