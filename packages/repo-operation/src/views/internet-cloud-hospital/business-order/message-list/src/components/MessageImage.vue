<template>
  <!-- 消息内容 -->
  <div>
    <preview-img :src="imgUrl"></preview-img>
    <!-- <el-image @click="viewImage"
               :width="imgWidth"
               :height="imgHeight"
               lazy-load
               :src="imgUrl">
      <template v-slot:loading>
        <van-loading type="spinner"
                     size="20" />
      </template>
      <template v-slot:error>加载失败</template>
    </el-image> -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import { ImagePreview, Lazyload } from 'vant'

// Vue.use(ImagePreview, Lazyload)

import PreviewImg from './PreviewImg'
export default {
  components: { PreviewImg },
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

