<template>
  <!-- 消息内容 -->
  <div>
    <el-image @click="viewImage"
              :width="imgWidth"
              :height="imgHeight"
              :preview-src-list="imgUrl"
              lazy-load
              :src="imgUrl">
      <template v-slot:loading>
        <van-loading type="spinner"
                     size="20" />
      </template>
      <template v-slot:error>加载失败</template>
    </el-image>
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

