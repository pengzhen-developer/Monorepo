<template>
  <div :style="style" class="full-screen-dialog" ref="dialog">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'FullScreenDialog',
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 999
    }
  },
  data() {
    return {
      style: ''
    }
  },
  methods: {
    getStyle() {
      if (this.zIndex) {
        this.style = `z-index: ${this.zIndex};`
      }
    },
    playAnimation() {
      this.$refs.dialog.style.transform = 'translateY(0)'
    }
  },
  created() {
    this.getStyle()
  },
  mounted() {
    if (this.appendToBody) document.body.appendChild(this.$el)
    this.playAnimation()
  },
  destroyed() {
    if (this.appendToBody) this.$el.parentNode.remove(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.full-screen-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #fff;
  transform: translateY(100%);
  animation: toTop 0.3s;
}

@keyframes toTop {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
