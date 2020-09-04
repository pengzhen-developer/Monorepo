<template>
  <div>
    <MessageFirstOptionCard :firstInfo="firstInfo"></MessageFirstOptionCard>
  </div>
</template>

<script>
import MessageFirstOptionCard from './MessageFirstOptionCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageFirstOptionCard
  },
  computed: {
    firstInfo() {
      return {
        familyId: 'mqbijvrkoq', //家人ID
        hospitalId: '23232', //机构ID
        hospitalName: '北辰医院' //机构名称
      }
    }
  },
  data() {
    return {
      checkOrder: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      // const params = {
      //   checkOrderNo: this.message.content.data.checkOrderInfo.checkOrderNo
      // }
      // peace.service.inquiry.getOrderDetail(params).then((res) => {
      //   this.checkOrder.visible = true
      //   this.checkOrder.data = res.data.info
      // })
    }
  }
}
</script>

<style>
</style>