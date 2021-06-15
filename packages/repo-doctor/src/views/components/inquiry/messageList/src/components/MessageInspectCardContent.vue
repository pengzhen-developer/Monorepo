<template>
  <div>
    <message-inspect-card :checkOrderTxt="checkOrderTxt" @onClickDetail="onClickDetail"></message-inspect-card>
  </div>
</template>

<script>
import MessageInspectCard from './MessageInspectCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInspectCard
  },
  computed: {
    checkOrderTxt() {
      return this.message.content.data.checkComboList
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
    onClickDetail() {}
  }
}
</script>

<style></style>
