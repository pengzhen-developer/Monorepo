<template>
  <div>
    <MessageInquiryCard :familyName="familyName"
                        :familySex="familySex"
                        :familyAge="familyAge"
                        :isAgain="isAgain"
                        :confirmIllness="confirmIllness"
                        :describe="describe"
                        :paymentType="paymentType"
                        @onClickMore="onClickMore"
                        @onClickContent="onClickContent"></MessageInquiryCard>
    <PeaceDialog :visible.sync="preliminary.visible"
                 v-if="preliminary.visible"
                 append-to-body
                 title="问诊单详情">
      <InquiryPreliminary :data="preliminary.data"
                          @close="() => preliminary.visible = false"></InquiryPreliminary>
    </PeaceDialog>
  </div>
</template>

<script>
//
import MessageInquiryCard from './MessageInquiryCard'
import InquiryPreliminary from '@src/views/components/inquiry/InquiryPreliminary'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInquiryCard,
    InquiryPreliminary
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
    },
    paymentType() {
      return this.message.content.data.inquiryOrderInfo.paymentType || 1
    }
  },
  data() {
    return {
      preliminary: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    //查看问诊详情
    onClickMore() {
      this.preliminary.visible = true
      this.preliminary.data = this.message.content.data
    },
    //查看问诊单
    onClickContent() {
      this.preliminary.visible = true
      this.preliminary.data = this.message.content.data
    }
  }
}
</script>

<style>
</style>