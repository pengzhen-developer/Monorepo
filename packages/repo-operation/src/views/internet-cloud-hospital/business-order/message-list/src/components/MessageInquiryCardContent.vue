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
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialog.visible"
                  v-if="dialog.visible"
                  append-to-body
                  title="问诊详情">
      <InquiryPreliminary :data="dialog.data"
                          @close="() => dialog.visible = false"></InquiryPreliminary>
    </peace-dialog>
    <!-- 订单详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="info.visible"
                  :title="`${isAgain ? '复诊':'咨询'}订单详情`"
                  v-if="info.visible"
                  append-to-body>
      <PeaceOrderInquiryDetail v-bind:data="info.data"
                               v-bind:type="isAgain?'returnVisit':'inquiry'"></PeaceOrderInquiryDetail>
    </peace-dialog>
  </div>
</template>

<script>
import MessageInquiryCard from './MessageInquiryCard'
import InquiryPreliminary from './InquiryPreliminary'
import Service from '../service'
import { PeaceOrderInquiryDetail } from 'peace-components'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageInquiryCard,
    InquiryPreliminary,
    PeaceOrderInquiryDetail
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
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      },
      info: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    //查看问诊详情
    onClickMore() {
      let id = this.message.content.data.inquiryInfo.inquiryNo
      const params = { inquiry_no: id }
      Service.getAdvisoryInfo(params).then((res) => {
        this.info.visible = true
        this.info.data = res.data
      })
    },
    //查看问诊单
    onClickContent() {
      this.dialog.visible = true
      this.dialog.data = this.message.content.data
    }
  }
}
</script>

<style>
</style>