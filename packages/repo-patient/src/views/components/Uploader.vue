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
                  :loading="loading"
                  type="primary"
                  @click="confirm">确定</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
import peace from '@src/library'

import { Dialog } from 'vant'
import Compressor from 'compressorjs'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    maxCount: Number
  },

  data() {
    return {
      internalMaxCount: this.maxCount || 9,
      fileList: [],
      list: [],
      loading: false
    }
  },

  methods: {
    beforeRead(file) {
      if (!file.content) {
        file = Array.prototype.slice.call(file)
      } else {
        file = [file]
      }
      let flag = true
      file.forEach(item => {
        if (item.type !== 'image/jpeg' && item.type !== 'image/jpg' && item.type !== 'image/png') {
          $peace.util.alert('请上传 jpeg、jpg、png 格式图片')
          flag = false
        }
      })
      return flag
    },
    confirm() {
      if (this.loading) {
        return
      }
      this.loading = true
      if (this.$route.params.emit) {
        this.uploadHandler(this.fileList)
          .then(() => {
            $peace.$emit(this.$route.params.emit, this.list)
            this.$router.go(-1)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    uploadHandler(dataArray) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(dataArray) && dataArray.length) {
          // 压缩
          const compress = () => {
            return new Promise(resolve => {
              const files = []
              for (let i = 0; i < dataArray.length; i++) {
                new Compressor(dataArray[i].file, {
                  quality: 0.4,
                  convertSize: 50000,
                  success: fileBlob => {
                    files.push(new File([fileBlob], fileBlob.name, { type: fileBlob.type }))

                    if (files.length === dataArray.length) {
                      resolve(files)
                    }
                  }
                })
              }
            })
          }

          // 上传
          compress()
            .then(files => {
              let Promises = files.map(item => {
                return this.uploader(item)
              })
              Promise.all(Promises).then(datas => {
                this.list = this.list.concat(datas)

                resolve(this.list)
              })
            })
            .catch(err => {
              peace.util.alert('图片上传失败，请稍后再试')
              reject(err)
            })
        } else {
          resolve()
        }
      })
    },
    uploader(file) {
      let type = this.$route.params.emit == 'DoctorInquiryApplyUpload' ? 1 : 2
      const params = new FormData()
      params.append('source', 'inquiryApply')
      params.append('type', type)
      params.append('file[]', file)

      return new Promise((resolve, reject) => {
        peace.service.inquiry
          .images(params)
          .then(res => {
            resolve(res.data[0])
          })
          .catch(error => {
            peace.util.alert('图片上传失败，请稍后再试')
            reject(error)
          })
      })
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