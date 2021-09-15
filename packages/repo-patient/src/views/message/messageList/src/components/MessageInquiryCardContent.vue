<template>
  <div>
    <MessageInquiryCard :familyName="familyName"
                        :familySex="familySex"
                        :familyAge="familyAge"
                        :isAgain="isAgain"
                        :confirmIllness="confirmIllness"
                        :describe="describe"
                        @onClickMore="onClickMore"
                        @onClickContent="onClickContent"></MessageInquiryCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageInquiryCard from './MessageInquiryCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInquiryCard
  },
  computed: {
    familyName() {
      return this.message.content.data.patientInfo.familyName
    },
    familySex() {
      return this.message.content.data.patientInfo.familySex
    },
    familyAge() {
      return this.message.content.data.patientInfo.familyAge
    },
    isAgain() {
      return this.message.content.data.inquiryOrderInfo && this.message.content.data.inquiryOrderInfo.isAgain
    },
    confirmIllness() {
      return this.message.content.data.inquiryOrderInfo && this.message.content.data.inquiryOrderInfo.confirmIllness
    },
    describe() {
      return this.message.content.data.inquiryOrderInfo && this.message.content.data.inquiryOrderInfo.describe
    }
  },
  methods: {
    //查看问诊详情
    onClickMore() {
      let json = peace.util.encode({
        inquiryId: this.message.content.data.inquiryOrderInfo.inquiryId,
        fromChatRoom: true
      })

      this.$router.push(`/setting/userConsultDetail/${json}`)
    },
    //查看问诊单
    onClickContent() {
      let json = peace.util.encode({
        InquiryOrder: this.message.content.data
      })

      this.$router.push(`/components/thePreliminaryForm/${json}`)
    }
  }
}
</script>

<style>
</style>