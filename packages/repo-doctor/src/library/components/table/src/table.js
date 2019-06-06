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
      return [5, 10, 20, 30, 40, 50, 100]
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
        method: 'post',
        // axios params
        params: {}
      }
    }
  },

  watch: {
    data() {
      this.internalData = this.data
    }
  },

  created() {
    if (this.pagination) {
      this._generatePagination()
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.pagination) {
        this._mountPagination()
      }
    })
  },

  destroyed() {
    this._removePagination()
  },

  methods: {
    // 生成分页组件
    _generatePagination() {
      const pagination = Vue.extend(Pagination)

      this.Pagination = new pagination({
        components: { Pagination },
        parent: this,
        propsData: this.$props
      }).$mount()
    },

    // 挂载分页组件
    _mountPagination() {
      const container = document.createElement('div')
      const parent = this.$el.parentNode
      if (parent.lastChild == this.$el) {
        parent.appendChild(container)
      } else {
        parent.insertBefore(container, this.$el.nextSibling)
      }

      container.appendChild(this.Pagination.$el)
      this._PaginationContainer = container
    },

    _removePagination() {
      this._PaginationContainer && this._PaginationContainer.remove()
    },

    _generateConfig(config) {
      // 获取当前的分页信息
      if (this.Pagination) {
        this.config.params.p = this.Pagination.internalCurrentPage
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

      // 区别 axios 对 get / post 不同的传参方式
      if (this.config.method.toLocaleLowerCase() === 'get' || this.config.method.toLocaleLowerCase() === 'delete') {
        this.config.params = this.config.params.params ? this.config.params : { params: this.config.params }
      }
    },

    // 排序
    internalSortChange({ prop, order }) {
      if (order === 'ascending') {
        order = 'asc'
      } else if (order === 'descending') {
        order = 'desc'
      }

      this.config.params.field = prop
      this.config.params.order = order

      return this.loadData()
    },

    reloadData(config = {}) {
      this.Pagination.internalPageSize = 1

      return this.loadData(config)
    },

    loadData(config = {}) {
      this._generateConfig(config)

      return this.fetch()
    },

    fetch() {
      if (!this.config.api) {
        console.warn('表格尚未配置 api, 无法获取远端数据!')

        return
      }

      return $peace.$http[this.config.method](this.config.api, this.config.params).then(res => {
        if (this.pagination) {
          this.internalData = (res.data && res.data.list) || []
          this.Pagination.internalTotal = (res.data && res.data.count) || (res.data && res.data.total) || 0
        } else {
          this.internalData = res.data
        }

        return res
      })
    }
  },

  render(h) {
    return h(Table, {
      props: { ...this.$props, data: this.internalData },
      attrs: this.$attrs,
      on: { ...this.$listeners, 'sort-change': this.internalSortChange },
      scopedSlots: this.$scopedSlots
    })
  }
}
