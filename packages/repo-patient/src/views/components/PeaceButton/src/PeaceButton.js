import { Button } from 'vant'

let isAvail = true

const throttle = function(func, delay, context, event) {
  return (function() {
    if (isAvail) {
      func.apply(context, event)
      isAvail = false

      setTimeout(function() {
        isAvail = true
      }, delay)
    }
  })()
}

const ExtendProp = {
  throttle: {
    type: Boolean,
    default() {
      return false
    }
  },

  throttleTime: {
    type: Number,
    default() {
      return 1000
    }
  }
}

export default {
  name: 'PeaceButton',

  props: {
    ...Button.props,

    ...ExtendProp
  },

  methods: {
    handleClickLink(event) {
      throttle(this.$listeners.click, this.throttleTime, this, event)
    }
  },

  render(h) {
    const clickHandler = this.throttle ? this.handleClickLink : this.$listeners.click

    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self
        return vnode
      })

    return h(
      Button,
      {
        // 扩展 props
        props: this.$props,

        // 扩展 attrs
        attrs: this.$attrs,

        // 扩展 listeners
        on: {
          ...this.$listeners,

          click: clickHandler
        },

        // 扩展 slots
        scopedSlots: this.$scopedSlots
      },
      slots
    )
  }
}
