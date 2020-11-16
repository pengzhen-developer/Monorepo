<template>
  <div>
    <MessageCaseCard :diagnosis="diagnosis"
                     :visitingTime="visitingTime"
                     @onClickDetail="onClickDetail"></MessageCaseCard>
    <peace-dialog :visible.sync="caseDetail.visible"
                  append-to-body
                  title="病历详情">
      <InquirySessionCaseDetail :data="caseDetail.data"></InquirySessionCaseDetail>
    </peace-dialog>
  </div>
</template>

<script>
import MessageCaseCard from './MessageCaseCard'
import InquirySessionCaseDetail from '@src/views/components/inquiry/InquirySessionCaseDetail'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageCaseCard,
    InquirySessionCaseDetail
  },
  computed: {
    diagnosis() {
      return this.message.content.data.caseInfo && this.message.content.data.caseInfo.diagnosis
    },
    visitingTime() {
      return this.message.content.data.caseInfo && this.message.content.data.caseInfo.visitingTime
    }
  },
  data() {
    return {
      caseDetail: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      const params = {
        inquiry_no: this.message.content.data.inquiryInfo.inquiryNo
      }
      Peace.service.inquiry.getCase(params).then((res) => {
        this.caseDetail.visible = true
        this.caseDetail.data = res.data
      })
    }
  }
}
</script>

<style>
</style>