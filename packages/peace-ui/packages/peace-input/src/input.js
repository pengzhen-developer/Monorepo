import { createHOC } from 'vue-hoc'
import { Input } from 'element-ui'

const options = {
  name: 'PeaceInput',

  props: {
    maxlength: {
      type: [String, Number],
      default() {
        if (this.type === 'textarea') {
          return '200'
        } else if (this.type === 'text') {
          return '50'
        }
        return ''
      }
    }
  }
}

const renderWith = {}

export default createHOC(Input, options, renderWith)
