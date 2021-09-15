import { Button } from 'vant'

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
  data() {
    return {
      isAvail: true
    }
  },
  props: {
    ...Button.props,

    ...ExtendProp
  },

  methods: {
    handleClickLink(event) {
      this._throttle(this.$listeners.click, this.throttleTime, this, event)
    },
    _throttle(func, delay, context, event) {
      return (() => {
        if (context.isAvail) {
          func.apply(context, event)
          context.isAvail = false

          setTimeout(function() {
            context.isAvail = true
          }, delay)
        }
      })()
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
