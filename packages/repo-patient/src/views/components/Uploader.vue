<template>
  <div class="layout uploader">
    <van-notice-bar :scrollable="false">
      您最多可上传 {{ internalMaxCount }} 张图片
    </van-notice-bar>

    <div class="layout-content">
      <van-uploader v-model="fileList"
                    multiple
                    :max-count="internalMaxCount"
                    :before-read="beforeRead" />
    </div>

    <div class="layout-footer">
      <van-button size="large"
                  type="primary"
                  @click="confirm">确定</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  props: {
    maxCount: Number
  },

  data() {
    return {
      internalMaxCount: this.maxCount || 9,
      fileList: []
    }
  },

  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        $peace.util.alert('请上传 jpeg、jpg、png 格式图片')
        return false
      }
      return true
    },

    confirm() {
      if (this.$route.params.emit) {
        $peace.$emit(this.$route.params.emit, this.fileList)

        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  /deep/ .van-notice-bar__wrap {
    display: flex;
    justify-content: center;
  }

  .layout-content {
    flex: 1;

    /deep/ .van-uploader__wrapper {
      width: 100%;
      padding: 10px;
      display: flex;

      .van-uploader__upload,
      .van-uploader__preview-image,
      .van-uploader__preview {
        width: 110px;
        height: 110px;
      }
    }
  }

  .layout-footer {
  }
}
</style>