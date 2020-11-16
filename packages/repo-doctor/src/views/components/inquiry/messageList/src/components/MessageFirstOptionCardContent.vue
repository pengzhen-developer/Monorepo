<template>
  <div>
    <MessageFirstOptionCard :firstInfo="firstInfo"
                            @onClickDetail="onClickDetail"></MessageFirstOptionCard>

    <peace-dialog :visible.sync="optionDialog.visible"
                  append-to-body
                  title="诊疗记录">
      <InquiryOptionRecord :data="optionDialog.data"></InquiryOptionRecord>
    </peace-dialog>
  </div>
</template>

<script>
import MessageFirstOptionCard from './MessageFirstOptionCard'
import InquiryOptionRecord from '@src/views/components/inquiry/InquiryOptionRecord.vue'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageFirstOptionCard,
    InquiryOptionRecord
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
      this.optionDialog.data = Peace.util.deepClone(this.items)
    }
  }
}
</script>

<style>
</style>