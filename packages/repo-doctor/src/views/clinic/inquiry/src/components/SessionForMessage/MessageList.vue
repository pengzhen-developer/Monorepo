<template>
  <div>
    <InquirySessionMessageList v-bind:messages="this.$store.state.inquiry.sessionMessages"></InquirySessionMessageList>
  </div>
</template>

<script>
import InquirySessionMessageList from '@src/views/components/inquiry/messageList'

export default {
  components: {
    InquirySessionMessageList
  }
}
</script>

<style>
</style>