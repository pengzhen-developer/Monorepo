<template>
  <div>
    <MessageInspectionRegistedCard :checkComboList="checkComboList"
                                   @onClickDetail="onClickDetail"></MessageInspectionRegistedCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageInspectionRegistedCard from './MessageInspectionRegistedCard'

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
    MessageInspectionRegistedCard
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
        return peace.util.alert('咨询已结束，如需服务需再次咨询')
      }
      let params = {
        checkRecordId: this.message.content.data.checkRecordId
      }
      peace.service.inquiry.getCheckRegisterOrderDetailBefore(params).then((res) => {
        if (res.data.registeringOrderNo) {
          const json = peace.util.encode({ orderNo: res.data.registeringOrderNo })
          this.gotoOrderDetail(json)
        } else {
          const json = peace.util.encode(params)
          this.gotoOrderBefore(json)
        }
      })
    },
    gotoOrderBefore(json) {
      this.$router.push(`/inspectRegisterAdvance/${json}`)
    },
    gotoOrderDetail(json) {
      this.$router.push(`/inspectRegisterDetail/${json}`)
    }
  }
}
</script>

<style>
</style>