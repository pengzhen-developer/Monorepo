import { createHOC } from 'vue-hoc'
import { Button } from 'element-ui'

const options = {
  name: 'PeaceButton',

  props: {
    throttle: {
      type: Boolean,
      default() {
        return false
      }
    },

    throttleTime: {
      type: [Number, String],
      default() {
        return 300
      }
    }
  },

  data() {
    return {
      isAvail: true
    }
  },

  methods: {
    throttleFunc(func, delay, context, event) {
      const self = this

      return (function() {
        if (self.isAvail) {
          func.apply(context, event)
          self.isAvail = false

          setTimeout(function() {
            self.isAvail = true
          }, delay)
        }
      })()
    },

    throttleClick(event) {
      this.throttleFunc(this.$listeners.click, Number(this.throttleTime), this, event)
    }
  }
}

const renderWith = {
  listeners: {
    click(event) {
      if (this.$listeners.click) {
        if (this.throttle) {
          this.throttleFunc(this.$listeners.click, Number(this.throttleTime), this, event)
        } else {
          this.$listeners.click.apply(this, arguments)
        }
      }
    }
  }
}

export default createHOC(Button, options, renderWith)
