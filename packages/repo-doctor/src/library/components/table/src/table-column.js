import { TableColumn } from 'element-ui'

export default {
  name: 'peace-table-column',

  props: {
    ...TableColumn.props
  },

  render(h) {
    return h(TableColumn, {
      // 扩展 props
      props: Object.assign({}, this.$props, {
        headerAlign: 'center',
        align: 'center'
      }),

      // 扩展 attrs
      attrs: this.$attrs,

      // 扩展 listeners
      on: this.$listeners,

      // 扩展 slots
      scopedSlots: this.$scopedSlots
    })
  }
}
