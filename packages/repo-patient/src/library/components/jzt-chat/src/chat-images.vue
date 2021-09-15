<template>
  <div class="chat-item-wrapper"
       :class="[
      position === 'right' ? 'chat-item-wrapper--right' : 'chat-item-wrapper--left',
    ]"
       :data-key="id">
    <div class="chat-group">
      <div v-for="(image, index) in images"
           :key="index"
           class="chat-item chat-item--img"
           :class="[
          position ? 'chat-item--' + position : ''
      ]">
        <img :src="image.path"
             @click="viewImage(image, index)"
             alt="患处图片"
             class="image">
      </div>
    </div>
    <span v-if="ifShowUpdateBtn"
          class="btn-update"
          @click="onClickUpdateBtn">点击修改</span>
    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="images.map(image => image.path)">
      <template v-slot:cover>
        <van-button icon="cross"
                    type="primary"
                    round
                    @click="imagePreview.visible = false" />
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import { actionAnimation } from './utils'

export default {
  name: 'ChatImages',

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
    // 图片数组，可能含有多个图片
    images: {
      type: Array,
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
    return {
      show: true,
      imagePreview: {
        visible: false,
        position: 0
      }
    }
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
    },
    viewImage(file, fileIndex) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
    }
  },

  mounted() {
    const el = this.$el
    this.enterAnimation(el)
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.chat-group {
  margin-bottom: -16px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .chat-item {
    display: inline-flex;
    padding: 12px 16px;
    transition: all ease-in-out 0.5s;
    margin-bottom: 16px;

    &--img {
      background: transparent;
      padding: 0;

      .image {
        max-width: 140px;
        max-height: 140px;
        width: auto;
        height: auto;
        border-radius: 8px;
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
    }
  }
}

.btn-update {
  color: rgb(0, 198, 174);
  font-size: 14px;
  margin-top: 4px;
}
v-deep .van-image-preview__index {
  top: 24px;
}

v-deep .van-image-preview__cover {
  position: absolute;
  top: 24px;
  left: 24px;

  .van-button--round {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2a2a2a;
    background-color: #999999;
    border: 1px solid #999999;

    .van-button__icon {
      line-height: 1;
    }
  }
}
</style>
