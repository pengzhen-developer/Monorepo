import { createHOC } from 'vue-hoc'
import { DatePicker } from 'element-ui'

const options = {
  name: 'PeaceDatePicker',

  props: {
    ['unlink-panels']: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      // 添加样式
      this.$el.classList.add('peace-date-picker')

      // 修改 dateRange
      if (this.type === 'daterange' || this.type === 'datetimerange') {
        const dateIcon =
          this.$el.querySelector('.el-input__icon.el-range__icon.el-icon-date') || this.$el.querySelector('.el-input__icon.el-range__icon.el-icon-time')
        const dateCloseIcon = this.$el.querySelector('.el-input__icon.el-range__close-icon')

        dateIcon.style.display = 'block'
        dateIcon.style.marginLeft = '0'

        this.$el.removeChild(dateIcon)
        this.$el.appendChild(dateIcon)

        dateCloseIcon.addEventListener('click', () => {
          dateIcon.style.display = 'block'
          dateCloseIcon.style.display = 'none'
        })

        this.$el.addEventListener('mouseover', () => {
          if (this.$children[0].value && this.$children[0].value.length > 0) {
            dateIcon.style.display = 'none'
            dateCloseIcon.style.display = 'block'
          }
        })

        this.$el.addEventListener('mouseout', () => {
          dateIcon.style.display = 'block'
          dateCloseIcon.style.display = 'none'
        })
      }

      // 修改 date
      else if (this.type === 'date') {
        const dateIcon = this.$el.querySelector('.el-input__prefix')
        const dateCloseIcon = this.$el.querySelector('.el-input__suffix')

        this.$el.removeChild(dateIcon)
        this.$el.appendChild(dateIcon)

        dateIcon.classList = 'el-input__suffix'

        dateCloseIcon.addEventListener('click', () => {
          this.$el.removeChild(dateIcon)
          this.$el.appendChild(dateIcon)
        })

        this.$el.addEventListener('mouseover', () => {
          if (this.value) {
            this.$el.removeChild(dateIcon)
          }
        })

        this.$el.addEventListener('mouseout', () => {
          this.$el.appendChild(dateIcon)
        })
      }
    })
  }
}

const renderWith = {}

export default createHOC(DatePicker, options, renderWith)
