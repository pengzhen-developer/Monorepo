<template>
  <div>
    <MessageInspectRegisterCard :inspectRegisterOrder="inspectRegisterOrder"
                                @onClickDetail="onClickDetail"></MessageInspectRegisterCard>
  </div>
</template>

<script>
import MessageInspectRegisterCard from './MessageInspectRegisterCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  components: {
    MessageInspectRegisterCard
  },
  computed: {
    inspectRegisterOrder() {
      return this.message.content.data.checkComboList
    }
  },
  methods: {
    onClickDetail() {}
  }
}
</script>

<style>
</style>