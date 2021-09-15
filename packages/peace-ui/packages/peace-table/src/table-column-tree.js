import { TableColumn } from 'element-ui'

const defaultPlaceholderStyle = {
  ['display']: 'inline-block',
  ['width']: '20px',
  ['lineHeight']: '20px',
  ['margin-right']: '3px',
  ['visibility']: 'hidden'
}

const ExtendTableColumnProps = {
  align: {
    type: String,
    default() {
      return 'left'
    }
  },

  'show-overflow-tooltip': {
    type: Boolean,
    default() {
      return false
    }
  },

  placeholderStyle: {
    type: Object,
    default() {
      return defaultPlaceholderStyle
    }
  }
}

export default {
  name: 'PeaceTableColumnTree',

  props: {
    ...TableColumn.props,

    ...ExtendTableColumnProps
  },

  methods: {
    resetPlaceholderStyle() {
      this.$nextTick().then(() => {
        const trs = document.querySelectorAll('.el-table__row.expanded:not(.el-table__row--level-0)')

        // 模拟占位符, 保持样式一致性
        // 占位符不存在, 才生成新的占位符
        trs.forEach((item) => {
          const trCell = item.querySelector('.cell')

          if (!trCell.querySelector('.el-table__expand-icon')) {
            const placeholderDiv = document.createElement('div')
            placeholderDiv.classList = 'el-table__expand-icon'
            placeholderDiv.style.display = this.placeholderStyle['display'] || defaultPlaceholderStyle['display']
            placeholderDiv.style.width = this.placeholderStyle['width'] || defaultPlaceholderStyle['width']
            placeholderDiv.style.lineHeight = this.placeholderStyle['line-height'] || defaultPlaceholderStyle['line-height']
            placeholderDiv.style.marginRight = this.placeholderStyle['margin-right'] || defaultPlaceholderStyle['margin-right']
            placeholderDiv.style.visibility = this.placeholderStyle['visibility'] || defaultPlaceholderStyle['visibility']
            const placeholderI = document.createElement('i')
            placeholderI.classList = 'el-icon-arrow-right'
            placeholderDiv.appendChild(placeholderI)

            trCell.insertBefore(placeholderDiv, trCell.childNodes[0])
          }
        })

        // 修改 expand 图标
        const tri = document.querySelectorAll('.el-table__row .el-icon-arrow-right')
        tri.forEach((item) => {
          item.classList = 'el-icon-caret-right'
        })
      })
    }
  },

  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self
        return vnode
      })

    this.$nextTick(() => {
      this.resetPlaceholderStyle()
    })

    return h(
      TableColumn,
      {
        // 扩展 props
        props: this.$props,

        // 扩展 attrs
        attrs: this.$attrs,

        // 扩展 listeners
        on: this.$listeners,

        // 扩展 slots
        scopedSlots: this.$scopedSlots
      },
      slots
    )
  }
}
