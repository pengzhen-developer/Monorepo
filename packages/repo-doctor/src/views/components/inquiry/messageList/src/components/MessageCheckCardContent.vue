<template>
  <div>
    <MessageCheckCard :checkOrderTxt="checkOrderTxt"
                      @onClickDetail="onClickDetail"></MessageCheckCard>
    <peace-dialog :visible.sync="checkOrder.visible"
                  v-if="checkOrder.visible"
                  append-to-body
                  title="检查单详情">
      <InquiryCheckOrderInfo :data="checkOrder.data"
                             @close="() => checkOrder.visible = false"></InquiryCheckOrderInfo>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageCheckCard from './MessageCheckCard'
import InquiryCheckOrderInfo from '@src/views/components/inquiry/InquiryCheckOrderInfo'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageCheckCard,
    InquiryCheckOrderInfo
  },
  computed: {
    checkOrderTxt() {
      return this.message.content.data.checkOrderInfo && this.message.content.data.checkOrderInfo.checkOrderTxt
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
      const params = {
        checkOrderNo: this.message.content.data.checkOrderInfo.checkOrderNo
      }

      peace.service.inquiry.getOrderDetail(params).then((res) => {
        this.checkOrder.visible = true
        this.checkOrder.data = res.data.info
      })
    }
  }
}
</script>

<style>
</style>