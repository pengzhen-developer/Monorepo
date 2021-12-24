<template>
  <!-- 隐藏的图片查看器 -->
  <el-image-viewer v-if="showImageViewer"
                   v-bind:on-close="close"
                   v-bind:url-list="imageViewerUrlList">
  </el-image-viewer>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  components: {
    ElImageViewer
  },

  props: {
    fileList: Array
  },

  watch: {
    fileList: {
      handler() {
        if (this.fileList.length > 0) {
          this.open()
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      showImageViewer: false,
      imageViewerUrlList: []
    }
  },

  methods: {
    open() {
      Promise.all(this.fileList.map((src) => this.isImageFile(src))).then((data) => {
        data.forEach((file, index) => {
          if (file) {
            this.openImageFile(this.fileList[index])
          } else {
            this.openOtherFile(this.fileList[index])
          }
        })
        if (this.imageViewerUrlList.length > 0) {
          this.showImageViewer = true
        }
      })
    },

    close() {
      this.showImageViewer = false
      this.$emit('on-close')
    },

    openImageFile(file) {
      this.imageViewerUrlList.push(file)
    },

    openOtherFile(file) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.target = '_blank'
      link.href = file
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    isImageFile(src) {
      let img = document.createElement('img')
      img.src = src
      return new Promise(function(resolve) {
        img.onerror = () => {
          resolve(undefined)
        }
        img.onload = () => {
          resolve(src)
        }
      })
    }
  }
}
</script>

<style>
</style>