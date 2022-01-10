import Vue from 'vue'
import emptyImage from './table-empty-image'

import { Table } from 'element-ui'
import Pagination from './pagination'

const ExtendPaginationProp = {
  tableProps: {
    type: Object,
    default() {
      return {
        pageIndex: 'p',
        pageSize: 'size',
        sortField: 'field',
        sortOrder: 'order'
      }
    }
  },

  emptyText: {
    type: String,
    default() {
      return '暂无数据'
    }
  },

  emptyImage: {
    type: String,
    default() {
      return emptyImage
    }
  },

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
  name: 'PeaceTable',

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
      internalLoading: false,
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
      container.style.marginTop = '10px'
      const parent = this.$el

      parent.appendChild(container)
      container.appendChild(this.Pagination.$el)
      this._PaginationContainer = container
    },

    _removePagination() {
      this._PaginationContainer && this._PaginationContainer.remove()
    },

    _generateConfig(config) {
      const filterNoop = (res) => res

      // 获取当前的分页信息
      if (this.Pagination) {
        // 默认全部传递 'p' 与 'current'
        this.config.params['p'] = this.Pagination.internalCurrentPage
        this.config.params['current'] = this.Pagination.internalCurrentPage

        this.config.params[this.tableProps.pageIndex] = this.Pagination.internalCurrentPage
        this.config.params[this.tableProps.pageSize] = this.Pagination.internalPageSize
      }

      // 扩展当前的请求参数
      this.config = Object.assign(
        {},
        {
          api: config.api || this.config.api,
          method: config.method || this.config.method,
          fetch: config.fetch || this.config.fetch,
          params: Object.assign({}, this.config.params, config.params),
          filter: config.filter || filterNoop
        }
      )

      // 区别 axios 对 get / post 不同的传参方式
      if (this.config.method.toLocaleLowerCase() === 'get' || this.config.method.toLocaleLowerCase() === 'delete') {
        delete this.config.params.params

        this.config.params = { params: this.config.params }
      }
    },

    // 排序
    internalSortChange({ prop, order }) {
      if (order === 'ascending') {
        order = 'asc'
      } else if (order === 'descending') {
        order = 'desc'
      }

      this.config.params[this.tableProps.sortField] = prop
      this.config.params[this.tableProps.sortOrder] = order

      return this.loadData()
    },

    reloadData(config = {}) {
      if (this.Pagination) {
        this.Pagination.internalCurrentPage = 1
      }

      this._generateConfig(config)

      return this.fetch()
    },

    loadData(config = {}) {
      this._generateConfig(config)
      return this.fetch()
    },

    fetch() {
      // 当远端数据请求成功时
      const onLoaded = (res) => {
        if (this.pagination) {
          this.internalData = (res.data && (res.data.list || res.data.records)) || []
          this.Pagination.internalTotal = (res.data && (res.data.count || res.data.total)) || 0
        } else {
          this.internalData = res.data.list || res.data.records || res.data
        }

        return res
      }

      // 传递了加载方法，使用加载方法加载
      if (this.config.fetch) {
        if (Peace.config.axiosHandleLoading !== true) {
          this.internalLoading = true
        }

        return this.config
          .fetch(this.config.params)
          .then(this.config.filter)
          .then(onLoaded)
          .finally(() => {
            this.internalLoading = false
          })
      }

      // 使用 API 加载
      else if (this.config.api) {
        console.warn('【 Components 】【 PeaceTable 】', new Date(), 'api 请求形式已过期，请使用 fetch 定义数据加载方式')
        return Peace.http[this.config.method](this.config.api, this.config.params).then(onLoaded)
      }

      // 异常
      else {
        return new Error('未正确配置加载方法, 无法获取远端数据!')
      }
    }
  },

  render(h) {
    const emptySlot = h('div', { attrs: { class: 'empty-slot' }, style: 'text-align: center; padding: 40px 0 60px 0;', slot: 'empty' }, [
      h('img', { style: 'width: 151px; height: 151px;', attrs: { src: this.emptyImage } }),
      h('div', { style: 'line-height: 24px;' }, [this.emptyText])
    ])

    this.$slots.empty = this.$slots.empty || emptySlot

    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self
        return vnode
      })

    return h('div', { directives: [{ name: 'loading', value: this.internalLoading }] }, [
      h(
        Table,
        {
          props: { ...this.$props, data: this.internalData },
          attrs: this.$attrs,
          on: { ...this.$listeners, 'sort-change': this.internalSortChange },
          scopedSlots: this.$scopedSlots
        },
        slots
      )
    ])
  }
}
