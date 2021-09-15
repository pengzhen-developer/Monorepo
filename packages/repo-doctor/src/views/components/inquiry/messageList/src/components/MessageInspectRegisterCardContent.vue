<template>
  <div>
    <message-inspect-register-card :checkOrderTxt="checkOrderTxt"
                                   @onClickDetail="onClickDetail"></message-inspect-register-card>
  </div>
</template>

<script>
import MessageInspectRegisterCard from './MessageInspectRegisterCard.vue'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInspectRegisterCard
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
