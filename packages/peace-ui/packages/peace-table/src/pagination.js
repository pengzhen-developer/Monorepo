import { Pagination } from 'element-ui'

const ExtendPaginationProps = {
  background: {
    type: Boolean,
    default() {
      return true
    }
  }
}

export default {
  name: 'PeacePagination',

  props: {
    ...Pagination.props,

    ...ExtendPaginationProps
  },

  data() {
    return {
      internalPageSize: this.pageSize,
      internalCurrentPage: this.currentPage,
      internalPageSizes: this.pageSizes,
      internalTotal: this.total,
      internalLayout: this.layout
    }
  },

  methods: {
    internalSizeChange(currentPageSize) {
      this.internalPageSize = currentPageSize

      return this.$parent.loadData(this.$parent.config)
    },

    internalCurrentChange(currentPage) {
      this.internalCurrentPage = currentPage

      return this.$parent.loadData(this.$parent.config)
    }
  },

  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self
        return vnode
      })

    return h(
      Pagination,
      {
        // 扩展 props
        props: Object.assign({}, this.$props, {
          currentPage: this.internalCurrentPage,
          pageSize: this.internalPageSize,
          pageSizes: this.internalPageSizes,
          total: this.internalTotal,
          layout: this.internalLayout
        }),

        // 扩展 attrs
        attrs: this.$attrs,

        // 扩展 listeners
        on: Object.assign(
          {},
          {
            'size-change': this.internalSizeChange,
            'current-change': this.internalCurrentChange
          },
          this.$listeners
        ),

        // 扩展 slots
        scopedSlots: this.$scopedSlots
      },
      slots
    )
  }
}
