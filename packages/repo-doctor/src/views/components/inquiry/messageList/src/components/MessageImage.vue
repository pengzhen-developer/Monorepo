<template>
  <!-- 消息内容 -->
  <div v-viewer
       class="cursor-pointer">
    <img :src="imgUrl"
         style="max-width: 400px; max-height: 600px; "
         title="查看大图" />
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 图片地址
     */
    imgUrl: {
      type: String,
      required: true
    },
    /*
     * 图片-宽
     */
    imgWidth: {
      type: [String, Number]
    },
    /*
     * 图片-高
     */
    imgHeight: {
      type: [String, Number]
    }
  },

  methods: {
    viewImage() {
      this.$emit('viewImage')
    }
  }
}
</script>

