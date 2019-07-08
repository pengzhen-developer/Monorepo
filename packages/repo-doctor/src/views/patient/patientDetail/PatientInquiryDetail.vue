<template>
  <div class="patient-inquiry-detail">
    <div :key="inquiry.inquiry_no" v-for="inquiry in patientInquiryList">
      <div class="center">
        <div class="circle"></div>
        <span class="time">{{ inquiry.updated_time }}</span>
      </div>

      <div class="detail">
        <div class="info">
          <div class="left">
            <span class="name">{{ inquiry.family_name }}</span>
            <span class="age" v-if="inquiry.sex">
              <i :class="[inquiry.sex === '男' ? 'el-icon-male' : 'el-icon-female']"></i>
            </span>
            <span class="age" v-if="inquiry.age">{{ inquiry.age }}岁</span>
            <el-tag>{{ inquiry.relation }}</el-tag>
            <span class="private-doctor" v-if="inquiry.isPrivateDoctor">私</span>
          </div>
          <div class="right">
            <el-button @click="showDetail(inquiry)" type="text">查看详情</el-button>
          </div>
        </div>

        <hr style="margin: 2px 0 10px 0;" />

        <div class="chat">
          <span class="title">病情描述：</span>
          <span v-html="inquiry.DESCRIBE"></span>
        </div>
        <div class="tag">
          <el-tag size="medium" type v-if="inquiry.case_no">
            <img src="~@src/assets/images/inquiry/ic_bingli@2x.png" />病历
          </el-tag>
          <el-tag size="medium" type v-if="inquiry.prescribe_prescrip_count">
            <img src="~@src/assets/images/inquiry/ic_chuf@2x.png" />处方
          </el-tag>
          <el-tag size="medium" type v-if="inquiry.referral_count">
            <img src="~@src/assets/images/inquiry/ic_zhuanzhen@2x.png" />转诊单
          </el-tag>
        </div>
      </div>
    </div>

    <peace-dialog :visible.sync="inquriyMessageDialog.visible" title="图文问诊记录">
      <InquirySessionMessageList :data="inquriyMessageDialog.messageList"></InquirySessionMessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import InquirySessionMessageList from '@src/views/clinic/inquiry/InquirySessionMessageList'

export default {
  components: {
    InquirySessionMessageList
  },

  data() {
    return {
      activeName: 'first',

      patientInquiryList: [],

      inquriyMessageDialog: {
        visible: false,
        messageList: []
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = { patientid: this.$route.params.id }

      peace.service.patient.patientListDescPc(params).then(res => {
        this.patientInquiryList = res.data.inquiry_list
      })
    },

    showDetail(row) {
      const params = { inquiryNo: row.inquiry_no }

      peace.service.patient.getOneInquiry(params).then(res => {
        const historyMessageFormatHandler = messages => {
          if (messages && Array.isArray(messages)) {
            messages.forEach(message => {
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

        this.inquriyMessageDialog.messageList = []
        this.inquriyMessageDialog.messageList = res.data.msgInfo
        this.inquriyMessageDialog.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-inquiry-detail {
  padding: 20px;

  .center {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;

    .circle {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $--color-primary;
      margin: 0 10px 0 0;
    }

    .vertical-line {
      height: 14px;
      width: 4px;
      border-left: solid $--color-primary 4px;
      margin: 0 10px 0 0;
    }

    span {
      &.title {
        font-weight: 500;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      &.time {
        font-weight: 400;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }
  }

  .detail {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(87, 97, 96, 0.1);
    border-radius: 5px;

    padding: 10px;
    margin: 0 0 10px 0;

    .info {
      display: flex;
      justify-content: space-between;

      .left {
        span {
          margin: 0 7px 0 0;
        }

        .name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
        }

        .age {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }

        .el-tag {
          font-size: 13px;
          border: 0;
        }
      }
    }

    .chat {
      margin: 0 0 10px 0;

      .title {
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        line-height: 20px;
      }
    }

    .tag {
      .el-tag {
        padding: 2px 10px;
        display: inline-flex;
        align-items: center;

        margin: 0 10px 0 0;

        font-size: 14px;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        height: 30px;
        border: 0;

        img {
          width: 16px;
          height: 16px;
          margin: 0 7px 0 0;
        }
      }
    }

    hr {
      margin: 5px 0;
    }
  }

  .private-doctor {
    background: #00c6ae;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: white;
    line-height: 17px;
    padding: 0 4px;
    margin: 0 10px 0 0;
  }
}
</style>
