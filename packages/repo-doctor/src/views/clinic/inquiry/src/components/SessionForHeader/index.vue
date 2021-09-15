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
  </div>
</template>

<script>
import Type from '@src/type'

export default {
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
  }
}
</script>