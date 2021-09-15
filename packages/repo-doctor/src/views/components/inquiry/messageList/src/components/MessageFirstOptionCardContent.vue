<template>
  <div>
    <MessageFirstOptionCard :firstInfo="firstInfo"
                            @onClickDetail="onClickDetail"></MessageFirstOptionCard>

    <PeaceDialog :visible.sync="optionDialog.visible"
                 append-to-body
                 title="诊疗记录">
      <FirstOptionDetail :prescriptionCode="optionDialog.data"></FirstOptionDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import MessageFirstOptionCard from './MessageFirstOptionCard'
import FirstOptionDetail from '@src/views/patient/patientDetail/src/components/FirtstOptionDetail.vue'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageFirstOptionCard,
    FirstOptionDetail
  },
  computed: {
    firstInfo() {
      return this.message.content.data.firstInfo
    }
  },
  data() {
    return {
      checkOrder: {
        visible: false,
        data: {}
      },
      optionDialog: {
        visible: false,
        data: undefined
      },
      items: []
    }
  },
  methods: {
    onClickDetail() {
      if (this.items && this.items.length > 0) {
        this.showHealthRecode()
        return
      }

      const params = {
        inquiryNo: this.message.content.data.inquiryInfo.inquiryNo
      }
      Peace.service.inquiry.getFirstOptionList(params).then((res) => {
        const tmpTimes = []
        const tmp = res.data.firstOptionList.map(function(item) {
          const tmpTime = item.createdTime.substring(0, 10)
          if (tmpTimes.includes(tmpTime)) {
            item.showTimeLabel = false
          } else {
            tmpTimes.push(tmpTime)
            item.showTimeLabel = true
          }
          return item
        })
        this.items = tmp
        this.showHealthRecode()
      })
    },
    showHealthRecode() {
      this.optionDialog.visible = true
      this.optionDialog.data = Peace.util.deepClone(this.items)[0].dataNo
    }
  }
}
</script>

<style>
</style>