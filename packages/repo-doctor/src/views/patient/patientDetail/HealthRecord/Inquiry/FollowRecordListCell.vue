<template>
  <div v-on:click="showDetail">
    <div class="time-line q-mb-sm">{{ item.followTime }}</div>
    <div class="q-pa-sm q-mb-md rounded-borders"
         style="background: #F9F9F9">
      <div class="text-justify"
           style="color: #333333">
        {{ item.chatContent }}
      </div>
    </div>

    <peace-dialog :visible.sync="dialog.visible"
                  append-to-body
                  title="问诊记录">
      <InquirySessionMessageList :data="dialog.data"></InquirySessionMessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import InquirySessionMessageList from '@src/views/clinic/inquiry/InquirySessionMessageList'

export default {
  name: 'FollowRecordListCell',
  props: {
    item: {
      type: Object,
      require: true,
      default: function() {
        return {
          id: '',
          followNo: '',
          chatContent: '',
          followTime: ''
        }
      }
    }
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: []
      }
    }
  },
  components: {
    InquirySessionMessageList
  },
  methods: {
    showDetail() {
      const params = {
        followNo: this.item.followNo
      }
      peace.service.patient.getOneInquiry(params).then((res) => {
        const historyMessageFormatHandler = (messages) => {
          if (messages && Array.isArray(messages)) {
            messages.forEach((message) => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow = this.$store.state.user.userInfo.list.docInfo.doctor_id === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.msgInfo)

        this.dialog.data = []
        this.dialog.data = res.data.msgInfo
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  color: rgba(153, 153, 153, 1);
  &:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $--color-primary;
    border-radius: 50%;
    margin: 0 8px 0 0;
    vertical-align: middle;
  }
}
</style>
