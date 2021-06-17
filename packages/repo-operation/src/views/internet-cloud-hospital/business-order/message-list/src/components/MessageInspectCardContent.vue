<template>
  <div>
    <MessageInspectCard :inspectOrder="inspectOrder"
                        @onClickDetail="onClickDetail"></MessageInspectCard>
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
  data() {
    return {}
  },
  components: {
    MessageInspectCard
  },
  computed: {
    inspectOrder() {
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