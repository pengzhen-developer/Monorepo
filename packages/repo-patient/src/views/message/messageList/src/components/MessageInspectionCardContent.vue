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