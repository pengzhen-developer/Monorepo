<template>
  <transition name="van-slide-up">
    <div class="full-screen-dialog"
         ref="dialog"
         v-if="visible">
      <div class="title">
        <van-nav-bar :title="title">
          <van-icon @click="close"
                    name="cross"
                    slot="left" />
        </van-nav-bar>
      </div>

      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'peace-dialog',

  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },

    title: {
      type: String,
      default() {
        return ''
      }
    }
  },

  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.full-screen-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;

  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
