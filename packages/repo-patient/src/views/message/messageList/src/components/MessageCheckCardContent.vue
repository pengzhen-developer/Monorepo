<template>
  <div>
    <MessageCheckCard :checkOrderTxt="checkOrderTxt"
                      @onClickDetail="onClickDetail"></MessageCheckCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageCheckCard from './MessageCheckCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageCheckCard
  },
  computed: {
    checkOrderTxt() {
      return this.message.content.data.checkOrderInfo && this.message.content.data.checkOrderInfo.checkOrderTxt
    }
  },
  methods: {
    onClickDetail() {
      let json = peace.util.encode({
        checkOrderNo: this.message.content.data.checkOrderInfo.checkOrderNo
      })

      this.$router.push(`/components/theInspection/${json}`)
    }
  }
}
</script>

<style>
</style>