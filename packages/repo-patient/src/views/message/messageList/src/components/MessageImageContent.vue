<template>
  <div>
    <MessageImage :imgUrl="imgUrl"
                  :imgWidth="imgWidth"
                  :imgHeight="imgHeight"
                  @viewImage="viewImage"></MessageImage>
    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
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
import MessageImage from './MessageImage'
export default {
  data() {
    return {
      imagePreview: {
        images: [],
        visible: false,
        position: 0
      }
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageImage
  },
  computed: {
    imgUrl() {
      return this.message.file.url
    },
    imgWidth() {
      return this.message.file.width
    },
    imgHeight() {
      return this.message.file.height
    }
  },
  methods: {
    viewImage() {
      this.imagePreview.visible = true
      this.imagePreview.position = 0
      this.imagePreview.images = [this.imgUrl]
    }
  }
}
</script>

<style>
</style>