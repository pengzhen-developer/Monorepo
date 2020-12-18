<template>
  <div class="flex justify-between items-center header q-px-md bg-grey-2">
    <span class="q-mr-md text-subtitle1">{{ patientInfo.familyName }}</span>

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
import type from '@src/type'
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

    patientInfo() {
      return this.session?.content?.patientInfo ?? {}
    },

    canShowOver() {
      return this.$store.state?.inquiry?.session?.content?.inquiryInfo?.inquiryStatus === type.INQUIRY.INQUIRY_STATUS.问诊中
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