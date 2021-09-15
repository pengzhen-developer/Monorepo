import { createHOC } from 'vue-hoc'
import { TimePicker } from 'element-ui'

const options = {
  name: 'PeaceTimePicker',

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
      this.$el.classList.add('peace-time-picker')

      // 修改 date
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
    })
  }
}

const renderWith = {}

export default createHOC(TimePicker, options, renderWith)
