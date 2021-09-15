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
  }
}

const renderWith = {}

export default createHOC(Dialog, options, renderWith)
