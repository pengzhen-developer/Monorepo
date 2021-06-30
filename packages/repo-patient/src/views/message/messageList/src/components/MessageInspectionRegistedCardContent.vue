<template>
  <div>
    <MessageInspectionRegistedCard :checkComboList="checkComboList"
                                   @onClickDetail="onClickDetail"></MessageInspectionRegistedCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageInspectionRegistedCard from './MessageInspectionRegistedCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInspectionRegistedCard
  },
  computed: {
    checkComboList() {
      return this.message.content.data.checkComboList
    }
  },
  methods: {
    onClickDetail() {
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