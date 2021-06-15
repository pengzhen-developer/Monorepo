<template>
  <div>
    <MessageInspectionCard :checkComboList="checkComboList"
                           @onClickDetail="onClickDetail"></MessageInspectionCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageInspectionCard from './MessageInspectionCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInspectionCard
  },
  computed: {
    checkComboList() {
      return this.message.content.data.checkComboList
    }
  },
  methods: {
    onClickDetail() {
      let params = {
        orderId: 'ardcfrtrew'
      }

      peace.service.inquiry.getCheckOrderDetail(params).then((res) => {
        const json = peace.util.encode(params)
        if (res.data.orderNo) {
          this.gotoOrderDetail(json)
        } else {
          this.gotoOrderBefore(json)
        }
      })
    },

    gotoOrderBefore(json) {
      this.$router.push(`/inspectionBeforeDetail/${json}`)
    },
    gotoOrderDetail(json) {
      this.$router.push(`/inspectionDetail/${json}`)
    }
  }
}
</script>

<style>
</style>