import Vue from 'vue'

import { Table } from 'element-ui'
import Pagination from './pagination'

const ExtendPaginationProp = {
  pageSize: {
    type: Number,
    default() {
      return 10
    }
  },
  currentPage: {
    type: Number,
    default() {
      return 1
    }
  },
  total: {
    type: Number,
    default() {
      return 0
    }
  },
  pageSizes: {
    type: Array,
    default() {
      return [1, 5, 10, 20, 30, 40, 50, 100]
    }
  },
  layout: {
    type: String,
    default() {
      return 'total, sizes, -> , prev, pager, next, slot'
    }
  }
}

const ExtendTableProp = {
  pagination: {
    type: Boolean,
    default() {
      return false
    }
  }
}

export default {
  name: 'peace-table',

  props: {
    // 可接收 Table Props
    ...Table.props,
    // 扩展 Table Props ( 相当于修改 Table Props )
    ...ExtendTableProp,

    // 可接收 Pagination Props
    ...Pagination.props,
    // 扩展 Pagination Props ( 相当于修改 Pagination Props )
    ...ExtendPaginationProp
  },

  data() {
    return {
      internalData: this.data,

      // 处理 axios
      config: {
        // axios api
        api: '',
        // axios methods
        method: 'get',
        // axios params
        params: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.pagination) {
        this._mountPagination()
      }
    })
  },

  methods: {
    // 挂载分页组件
    _mountPagination() {
      const pagination = Vue.extend(Pagination)

      this.Pagination = new pagination({
        components: { Pagination },
        parent: this,
        propsData: this.$props
      }).$mount()

      this.$el.parentNode.appendChild(this.Pagination.$el)
    },

    // 排序
    _sortChange({ prop, order }) {
      if (order === 'ascending') {
        order = 'asc'
      } else if (order === 'descending') {
        order = 'desc'
      }

      this.config.params.field = prop
      this.config.params.order = order

      this.loadData()
    },

    _generateConfig(config) {
      // 获取当前的分页信息
      if (this.pagination) {
        this.config.params.page = this.Pagination.internalCurrentPage
        this.config.params.size = this.Pagination.internalPageSize
      }

      // 扩展当前的请求参数
      this.config = Object.assign(
        {},
        {
          api: config.api || this.config.api,
          method: config.method || this.config.method,
          params: Object.assign({}, this.config.params, config.params)
        }
      )
    },

    reloadData(config = {}) {
      this.Pagination.internalPageSize = 1

      this.loadData(config)
    },

    loadData(config = {}) {
      this._generateConfig(config)

      this.fetch()
    },

    fetch() {
      if (!this.config.api) {
        console.warn('表格尚未配置 api, 无法获取远端数据!')

        return
      }

      $peace.$http.get(this.config.api, { params: this.config.params }).then(res => {
        this.internalData = res.data.list

        if (this.pagination) {
          this.Pagination.internalTotal = res.data.count
        }
      })
    }
  },

  render(h) {
    return h(Table, {
      // 扩展 props
      props: Object.assign({}, this.$props, {
        data: this.internalData,
        stripe: true
      }),

      // 扩展 attrs
      attrs: this.$attrs,

      // 扩展 listeners
      on: Object.assign({}, this.$listeners, {
        'sort-change': this._sortChange
      }),

      // 扩展 slots
      scopedSlots: this.$scopedSlots
    })
  }
}
