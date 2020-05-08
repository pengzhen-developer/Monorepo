<template>
  <div>
    <MessageCaseCard :diagnosis="diagnosis"
                     :visitingTime="visitingTime"
                     @onClickDetail="onClickDetail"></MessageCaseCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageCaseCard from './MessageCaseCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageCaseCard
  },
  computed: {
    diagnosis() {
      return this.message.content.data.caseInfo && this.message.content.data.caseInfo.diagnosis
    },
    visitingTime() {
      return this.message.content.data.caseInfo && this.message.content.data.caseInfo.visitingTime
    }
  },
  methods: {
    onClickDetail() {
      const params = peace.util.encode({
        inquiryNo: this.message.content.data.inquiryInfo.inquiryNo,
        inquiryId: this.message.content.data.inquiryInfo.inquiryId
      })

      this.$router.push(`/components/theCase/${params}`)
    }
  }
}
</script>

<style>
</style>