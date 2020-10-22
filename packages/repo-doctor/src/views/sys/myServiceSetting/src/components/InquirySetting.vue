// 在线咨询设置

<template>
  <div>
    <div class="q-pl-md q-mb-md">
      <div class="row q-col-gutter-lg">
        <div class="col-3">
          <el-card class="bg-grey-2 no-shadow q-px-md q-py-md"
                   v-bind:body-style="{ padding: 0 }">
            <div class="flex justify-between items-center">

              <div class="text-bold text-weight-medium">
                <q-icon style="font-size: 30px;"
                        class="q-mr-md"
                        v-bind:name="`img:${require('./../assets/img/ic_tuwen@2x.png')}`"></q-icon>
                <span>图文咨询</span>
              </div>
              <el-switch v-model="imageInquiryStatus"
                         v-on:change="changeImageInquiry"></el-switch>
            </div>

            <div class="q-my-md divider"></div>

            <div class="flex justify-between items-center">
              <span>设置价格</span>

              <q-input style="width: 80px;"
                       mask="#"
                       maxlength="6"
                       fill-mask="0"
                       reverse-fill-mask
                       input-class="text-right"
                       suffix="元"
                       v-model="imageInquiryFeeMask"
                       v-bind:disabled="!imageInquiryStatus"
                       v-on:change="changeImageInquiryFee" />
            </div>
          </el-card>
        </div>

        <div class="col-3">
          <el-card class="bg-grey-2 no-shadow q-px-md q-py-md"
                   v-bind:body-style="{ padding: 0 }">
            <div class="flex justify-between items-center q-mb-md">
              <div class="text-bold text-weight-medium">
                <q-icon style="font-size: 30px;"
                        class="q-mr-md"
                        v-bind:name="`img:${require('./../assets/img/ic_video_close@2x.png')}`"></q-icon>
                <span>视频咨询</span>
              </div>
              <el-switch v-model="videoInquiryStatus"
                         v-on:change="changeVideoInquiry"></el-switch>
            </div>

            <div class="q-mb-md divider"></div>

            <div class="flex justify-between items-center">
              <span>设置价格</span>
              <q-input style="width: 80px;"
                       mask="#"
                       maxlength="6"
                       fill-mask="0"
                       reverse-fill-mask
                       input-class="text-right"
                       suffix="元"
                       v-model="videoInquiryFeeMask"
                       v-bind:disabled="!videoInquiryStatus"
                       v-on:change="changeVideoInquiryFee" />
            </div>

          </el-card>
        </div>
      </div>
    </div>

    <div class="q-ml-md q-mb-md">
      <span class="text-grey-5">* 请设置价格，不设置价格将默认免费</span>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    data: Object
  },

  data() {
    return {
      /** 是否需要签名提醒 */
      isSign: undefined,

      /* 图文咨询状态 */
      imageInquiryStatus: false,
      imageInquiryFeeMask: '',

      /* 视频咨询状态 */
      videoInquiryStatus: false,
      videoInquiryFeeMask: ''
    }
  },

  computed: {
    // 在线咨询状态
    inquriyStatus() {
      return this.imageInquiryStatus || this.videoInquiryStatus
    },

    imageInquiryService() {
      return this.data?.inquiryServiceList?.find((service) => service.toolType === 'image')
    },

    videoInquiryService() {
      return this.data?.inquiryServiceList?.find((service) => service.toolType === 'video')
    },

    imageInquiryFee() {
      return this.imageInquiryFeeMask ? parseFloat(this.imageInquiryFeeMask) : 0
    },

    videoInquiryFee() {
      return this.videoInquiryFeeMask ? parseFloat(this.videoInquiryFeeMask) : 0
    }
  },

  watch: {
    data: {
      handler() {
        this.imageInquiryStatus = this.imageInquiryService?.status === 1
        this.imageInquiryFeeMask = this.imageInquiryService?.price

        this.videoInquiryStatus = this.videoInquiryService?.status === 1
        this.videoInquiryFeeMask = this.videoInquiryService?.price
      },
      immediate: true
    }
  },

  created() {},

  methods: {
    // 改变【在线咨询 - 图文咨询】状态
    changeImageInquiry() {
      const params = {
        id: this.imageInquiryService.id,
        status: this.imageInquiryStatus ? 1 : 2
      }

      Service.setInquiryStatus(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.$emit('success')
        })
    },

    // 改变【在线咨询 - 视频咨询】状态
    changeVideoInquiry() {
      const params = {
        id: this.videoInquiryService.id,
        status: this.videoInquiryStatus ? 1 : 2
      }

      Service.setInquiryStatus(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.$emit('success')
        })
    },

    // 改变【在线咨询 - 图文咨询】费用
    changeImageInquiryFee() {
      const params = {
        id: this.imageInquiryService.id,
        price: this.imageInquiryFee
      }

      Service.setInquiryPrice(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.$emit('success')
        })
    },

    // 改变【在线咨询 - 视频咨询】费用
    changeVideoInquiryFee() {
      const params = {
        id: this.videoInquiryService.id,
        price: this.videoInquiryFee
      }

      Service.setInquiryPrice(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.$emit('success')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  border-top: 6px dashed #e5e5e5;
  transform: scaleY(0.2);
}

/deep/ .q-field__control {
  height: 24px;
}

/deep/ .q-field__suffix {
  line-height: 1;
  padding: 5px;
}
</style>