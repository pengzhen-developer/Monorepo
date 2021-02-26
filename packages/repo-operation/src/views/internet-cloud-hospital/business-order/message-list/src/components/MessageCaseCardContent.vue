<template>
  <div>
    <MessageCaseCard :diagnosis="diagnosis"
                     :visitingTime="visitingTime"
                     @onClickDetail="onClickDetail"></MessageCaseCard>
    <!-- 病历详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialog.visible"
                  append-to-body
                  title="病历详情"
                  v-if="dialog.visible"
                  width="580px">
      <slot name="header"></slot>
      <RecordInfo :info="dialog.data"></RecordInfo>
    </peace-dialog>
  </div>
</template>

<script>
import MessageCaseCard from './MessageCaseCard'
import RecordInfo from './RecordInfo'
import Service from '../service'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageCaseCard,
    RecordInfo
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
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      let id = this.message.content.data.inquiryInfo.inquiryNo
      const params = { inquiryNo: id }
      Service.getRecordInfo(params).then((res) => {
        this.dialog.data = res.data
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style>
</style>