<template>
  <div v-on:click="showDetail">
    <div class="header row items-center q-mb-sm">
      <span class="time-line-time q-mr-sm">{{ item.updatedTime }}</span>
      <span>{{ item.inquiryWay }}</span>
    </div>

    <div class="column q-pa-md q-mb-md rounded-borders no-wrap" style="background: #F9F9F9">
      <div class="row items-baseline">
        <div class="col-2.5" style="color: #666666">病情描述：</div>
        <div class="col-9 text-justify q-mb-sm" style="color: #333333">
          {{ item.describe }}
        </div>
      </div>

      <viewer v-if="item.imageList && item.imageList.length > 0" class="row full-width wrap q-mb-sm" :images="item.imageList">
        <div v-for="(image, index) in item.imageList" v-bind:key="index.toString()" class="col-4 q-pr-sm q-pb-sm">
          <img v-bind:src="image" class="fit" />
        </div>
      </viewer>

      <div class="row items-center" v-if="(item.caseNo && item.caseNo.length > 0) || item.prescribePrescripCount > 0 || item.referralCount > 0">
        <div class="tag row items-center q-mr-sm" v-if="item.caseNo && item.caseNo.length > 0">
          <el-image v-bind:src="tipsInfo.caseHistory.icon" class="icon"></el-image>
          <span class="title">{{ tipsInfo.caseHistory.title }}</span>
        </div>

        <div class="tag row items-center q-mr-sm" v-if="item.prescribePrescripCount && item.prescribePrescripCount > 0">
          <el-image v-bind:src="tipsInfo.prescription.icon" class="icon"></el-image>
          <span class="title">{{ tipsInfo.prescription.title }}</span>
        </div>

        <div class="tag row items-center q-mr-sm" v-if="item.referralCount && item.referralCount > 0">
          <el-image v-bind:src="tipsInfo.consultation.icon" class="icon"></el-image>
          <span class="title">{{ tipsInfo.consultation.title }}</span>
        </div>
      </div>
    </div>

    <peace-dialog :visible.sync="dialog.visible" append-to-body title="问诊记录">
      <InquirySessionMessageList :data="dialog.data"></InquirySessionMessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import InquirySessionMessageList from '@src/views/clinic/inquiry/InquirySessionMessageList'
export default {
  name: 'InquiryRecordListCell',
  props: {
    item: {
      type: Object,
      require: true,
      default: function() {
        return {
          updatedTime: '',
          inquiryWay: '',
          describe: '',
          imageList: [],
          caseNo: undefined,
          referralCount: undefined,
          prescribePrescripCount: undefined
        }
      }
    }
  },
  components: {
    InquirySessionMessageList
  },
  data() {
    return {
      tipsInfo: {
        caseHistory: {
          title: '病例',
          icon: require('@src/assets/images/health-record/health_Record_Inquiry_case.png')
        },
        prescription: {
          title: '处方',
          icon: require('@src/assets/images/health-record/health_Record_Inquiry_rp.png')
        },
        consultation: {
          title: '会诊单',
          icon: require('@src/assets/images/health-record/health_Record_Inquiry_Consultation.png')
        }
      },
      dialog: {
        visible: false,
        data: []
      }
    }
  },
  methods: {
    showDetail() {
      const params = {
        inquiryNo: this.item.inquiryNo
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
.header {
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
.tag {
  height: 30px;
  background: #ebfbf9;
  border-radius: 3px;

  .icon {
    margin-left: 5px;
    margin-right: 10px;
    width: 14px;
    height: 16px;
  }
  .title {
    font-size: 14px;
    font-weight: 300;
    color: #333333;
    margin-right: 10px;
  }
}
</style>
