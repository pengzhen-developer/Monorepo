<template>
  <div class="flex justify-between items-center header q-px-md bg-grey-2">
    <div>
      <span class="q-mr-md text-subtitle1">{{ patientInfo.familyName }}</span>

      <el-tag effect="dark"
              size="medium"
              class="q-ml-md"
              type="primary">
        {{ inquiryStatusText }}
      </el-tag>
    </div>

    <el-button v-if="canShowOver"
               plain
               type="primary"
               v-on:click="overInquiry">结束问诊</el-button>

    <!-- 模态框 - 填写拒绝原因 -->
    <peace-dialog width="348px"
                  top="25vh"
                  class="no-header"
                  v-if="overInquiryVisible"
                  v-bind:visible.sync="overInquiryVisible">
      <OverInquiry v-on:close="overInquiryVisible = false"></OverInquiry>
    </peace-dialog>
  </div>
</template>

<script>
import Type from '@src/type'

import OverInquiry from './OverInquiry'

export default {
  components: {
    OverInquiry
  },

  data() {
    return {
      overInquiryVisible: false
    }
  },

  computed: {
    session() {
      return this.$store.state.inquiry?.session ?? {}
    },

    inquiryInfo() {
      return this.session?.content?.inquiryInfo ?? {}
    },

    patientInfo() {
      return this.session?.content?.patientInfo ?? {}
    },

    canShowOver() {
      return this.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.问诊中
    },

    inquiryStatusText() {
      return Object.keys(Type.INQUIRY.INQUIRY_TYPE).find((key) => Type.INQUIRY.INQUIRY_TYPE[key] === this.inquiryInfo?.inquiryType)
    }
  },

  methods: {
    overInquiry() {
      this.overInquiryVisible = true
    }
  }
}
</script>



<style lang="scss" scoped>
.no-header {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>