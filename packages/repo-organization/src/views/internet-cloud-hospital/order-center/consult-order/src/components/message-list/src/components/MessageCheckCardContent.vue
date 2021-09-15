<template>
  <div>
    <MessageCheckCard :checkOrderTxt="checkOrderTxt"
                      @onClickDetail="onClickDetail"></MessageCheckCard>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="checkOrder.visible"
                  v-if="checkOrder.visible"
                  append-to-body
                  title="检查单详情">
      <CheckOrder :data="checkOrder.data"
                  @close="() => checkOrder.visible = false"></CheckOrder>
    </peace-dialog>
  </div>
</template>

<script>
import MessageCheckCard from './MessageCheckCard'
import Service from '../service'
import CheckOrder from './CheckOrder'

export default {
  props: {
    message: {
      type: Object,
      required: true
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
  components: {
    MessageCheckCard,
    CheckOrder
  },
  computed: {
    checkOrderTxt() {
      return this.message.content.data.checkOrderInfo && this.message.content.data.checkOrderInfo.checkOrderTxt
    }
  },
  methods: {
    onClickDetail() {
      const params = {
        checkOrderNo: this.message.content.data.checkOrderInfo.checkOrderNo
      }

      Service.getOrderDetail(params).then((res) => {
        this.checkOrder.visible = true
        this.checkOrder.data = res.data.info
      })
    }
  }
}
</script>

<style>
</style>