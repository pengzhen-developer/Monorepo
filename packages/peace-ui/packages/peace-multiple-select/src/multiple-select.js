import { createHOC } from 'vue-hoc'
import { Select } from 'element-ui'

const options = {
  name: 'PeaceMultipleSelect',

  props: {
    multiple: {
      type: Boolean,
      default() {
        return true
      }
    },

    ['popper-class']: {
      type: String,
      default() {
        return `peace-multiple-select peace-multiple-select-${new Date().getTime()}`
      }
    }
  },

  methods: {
    createSpanForCheckbox() {
      const span = document.createElement('span')
      span.style.marginRight = '8px'
      span.classList.add('checkbox')

      return span
    },

    prependCheckbox() {
      const popper = document.body.querySelector(`.${this.popperClass.split(' ').join('.')}`)

      popper.querySelectorAll('.el-select-dropdown__item').forEach((li) => {
        if (li.querySelector('span.checkbox')) {
          return
        }

        const spanForCheckbox = this.createSpanForCheckbox()

        li.classList.add('prepend')
        li.style.display = 'flex'
        li.style.alignItems = 'center'

        li.prepend(spanForCheckbox)
      })
    }
  }
}

const renderWith = {
  listeners: {
    ['visible-change'](visible) {
      if (visible) {
        // prepend checkbox
        this.prependCheckbox()
      }

      if (this.$listeners['visible-change']) {
        this.$listeners['visible-change'].apply(this, arguments)
      }
    }
  }
}

export default createHOC(Select, options, renderWith)
