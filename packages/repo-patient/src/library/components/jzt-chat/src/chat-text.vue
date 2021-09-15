<template>
  <div class="chat-item-wrapper"
       :class="[
      position === 'right' ? 'chat-item-wrapper--right' : 'chat-item-wrapper--left',
    ]"
       :data-key="id">
    <div class="chat-item chat-item--text"
         :class="[
          position ? 'chat-item--' + position : ''
      ]"><span>{{ context }}</span></div>
    <span v-if="ifShowUpdateBtn"
          class="btn-update"
          @click="onClickUpdateBtn">点击修改</span>
  </div>
</template>

<script>
import { actionAnimation } from './utils'

export default {
  name: 'ChatText',

  props: {
    // left | right
    position: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    context: {
      type: String
    },
    ifShowUpdateBtn: {
      type: Boolean,
      default: false
    },
    updateCallbackFn: {
      type: Function
    }
  },

  data() {
    return {}
  },

  methods: {
    remove(cb) {
      const el = this.$el

      const leaveActiveName = this.position === 'left' ? 'jzt-slide-left-leave-active' : 'jzt-slide-right-leave-active'

      actionAnimation(el, leaveActiveName, cb)
    },
    enterAnimation(el) {
      const enterActiveName = this.position === 'left' ? 'jzt-slide-left-enter-active' : 'jzt-slide-right-enter-active'

      actionAnimation(el, enterActiveName, () => {
        this.$emit('after-enter')
      })
    },
    onClickUpdateBtn() {
      this.$emit('click-update-btn', this.id)
    }
  },

  mounted() {
    const el = this.$el
    this.enterAnimation(el)
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.chat-item {
  display: inline-flex;
  padding: 12px 16px;
  max-width: 80%;
  transition: all ease-in-out 0.5s;

  &--img {
    background: transparent;
    padding: 0;

    .image {
      margin-bottom: 8px;
    }
  }

  &--text {
    background: #fff;
    color: #38485c;
  }

  &--left {
    border-radius: 0px 20px 20px 20px;
  }

  &--right {
    border-radius: 20px 0px 20px 20px;
    background: #00c6ae;
    color: #fff;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
  }
}

.btn-update {
  color: rgb(0, 198, 174);
  font-size: 12px;
  margin-top: 4px;
}
</style>
