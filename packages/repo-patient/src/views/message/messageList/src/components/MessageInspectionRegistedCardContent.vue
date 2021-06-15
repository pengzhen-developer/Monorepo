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
        orderId: 'sdfsdfvrru'
      }

      peace.service.inquiry.getCheckRegisterOrderDetail(params).then((res) => {
        const json = peace.util.encode(params)
        if (res.data.orderNo) {
          this.gotoOrderDetail(json)
        } else {
          this.gotoOrderBefore(json)
        }
      })
    },
    gotoOrderBefore(json) {
      this.$router.push(`/inspectionRegisteredBeforeDetail/${json}`)
    },
    gotoOrderDetail(json) {
      this.$router.push(`/inspectionRegisteredDetail/${json}`)
    }
  }
}
</script>

<style>
</style>