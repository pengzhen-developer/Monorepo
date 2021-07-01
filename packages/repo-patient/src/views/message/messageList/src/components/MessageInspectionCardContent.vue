<template>
  <div>
    <MessageInspectionCard :checkComboList="checkComboList"
                           @onClickDetail="onClickDetail"></MessageInspectionCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageInspectionCard from './MessageInspectionCard'
import Constant from '../constant'
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    inquiryStatus: {
      type: [Number, String],
      required: false
    }
  },
  components: {
    MessageInspectionCard
  },
  data() {
    return {
      Constant: Constant
    }
  },
  computed: {
    checkComboList() {
      return this.message.content.data.checkComboList
    },
    canClick() {
      if (this.inquiryStatus === Constant.INQUIRY_STATUS.问诊中) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onClickDetail() {
      if (!this.canClick) {
        return peace.util.alert('问诊已结束，如需服务需再次问诊')
      }
      let params = {
        checkRecordId: this.message.content.data.checkRecordId
      }

      peace.service.inquiry.getCheckOrderDetailBefore(params).then((res) => {
        if (res.data.checkOrderNo) {
          const json = peace.util.encode({ orderNo: res.data.checkOrderNo })
          this.gotoOrderDetail(json)
        } else {
          const json = peace.util.encode(params)
          this.gotoOrderBefore(json)
        }
      })
    },

    gotoOrderBefore(json) {
      this.$router.push(`/inspectAdvance/${json}`)
    },
    gotoOrderDetail(json) {
      this.$router.push(`/inspectDetail/${json}`)
    }
  }
}
</script>

<style>
</style>