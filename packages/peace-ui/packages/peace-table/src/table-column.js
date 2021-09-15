import { createHOC } from 'vue-hoc'
import { TableColumn } from 'element-ui'

const options = {
  name: 'PeaceTableColumn',

  props: {
    ['align']: {
      type: String,
      default() {
        return 'left'
      }
    },

    ['header-align']: {
      type: String,
      default() {
        return 'left'
      }
    },

    ['emptyText']: {
      type: String,
      default() {
        return '--'
      }
    },

    ['formatter']: {
      type: Function,
      default(row, column, cellValue) {
        if (cellValue === '' || cellValue === undefined || cellValue === null) {
          return this.emptyText
        } else {
          return cellValue
        }
      }
    }
  }
}

const renderWith = {}

export default createHOC(TableColumn, options, renderWith)
