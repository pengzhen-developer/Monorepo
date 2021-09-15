import { createHOC } from 'vue-hoc'
import { Select } from 'element-ui'

const options = {
  name: 'PeaceSelect',

  props: {
    clearable: {
      type: Boolean,
      default() {
        return true
      }
    },
    filterable: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}

const renderWith = {}

export default createHOC(Select, options, renderWith)
