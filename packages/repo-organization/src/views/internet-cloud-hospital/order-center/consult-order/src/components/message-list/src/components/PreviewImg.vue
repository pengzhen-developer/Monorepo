<template>
  <div class="preview-img">
    <img :alt="alt"
         :src="src"
         @click="openWrapper">
    <div @click.stop="close"
         class="preview-img__wrapper"
         ref="wrapper"
         v-if="showOriginalImage">
      <!-- 查看原始图片 -->
      <img :alt="alt"
           :src="src"
           @click.stop="() => {}">
      <span @click.stop="close"
            class="close"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PreviewImg',
  props: {
    src: String,
    alt: String,
    appendTobody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showOriginalImage: false
    }
  },
  watch: {
    showOriginalImage() {
      if (this.appendTobody) {
        //
      }
    }
  },
  methods: {
    openWrapper() {
      this.showOriginalImage = true
    },
    close() {
      this.showOriginalImage = false
    }
  },
  mounted() {
    if (this.appendTobody) {
      console.log(this.$el)
      // document.body.appendChild(this.$el.refs.mask);
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      // this.$el.parentNode.removeChild(this.$el.refs.mask);
    }
  }
}
</script>
<style lang="scss" scoped>
.preview-img {
  display: inline-block;
  & > img {
    max-width: 100%;
    width: auto;
    height: inherit;
    display: inherit;
    cursor: pointer;
  }
  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 50px;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100%;
    display: block;
    z-index: 99999;
    overflow: auto;
    background: rgba(0, 0, 0, 0.5);
    & > img {
      position: absolute;
      max-width: 100%;
      max-height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      vertical-align: middle;
      display: inline-block;
    }
  }
  .close {
    position: fixed;
    right: 40px;
    top: 40px;
    color: #fff;
    font-size: 2rem;
    font-weight: normal;
    font-weight: 300;
    cursor: pointer;
    &:before {
      content: '×';
    }
  }
}
</style>

