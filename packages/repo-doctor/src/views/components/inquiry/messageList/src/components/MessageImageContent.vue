<template>
  <div>
    <MessageImage :imgUrl="imgUrl"
                  :imgWidth="imgWidth"
                  :imgHeight="imgHeight"
                  @viewImage="viewImage"></MessageImage>
  </div>
</template>

<script>
import MessageImage from './MessageImage'
export default {
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
    viewImage() {}
  }
}
</script>

<style>
</style>