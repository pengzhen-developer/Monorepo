<template>
  <div v-if="internalData.user_info && internalData.inquiry_list">
    <div class="header">
      <img :src="internalData.user_info.weixin_head_url" class="header-img">

      <div class="header-info">
        <div class="first-line">
          <span class="name">{{ internalData.user_info.patient_remarks || internalData.user_info.real_name || internalData.user_info.weixin_name }}</span>
          <span class="sex">{{ internalData.user_info.sex }}</span>
        </div>
        <div class="second-line">
          <span class="label">微信昵称</span>
          <span class="value">{{ internalData.user_info.weixin_name }}</span>

          <span class="label">联系方式</span>
          <span class="value">{{ internalData.user_info.tel }}</span>
        </div>
      </div>
    </div>

    <hr>

    <div class="center">
      <div class="vertical-line"></div>
      <span class="title">咨询记录 ({{ internalData.inquiry_list.length }})</span>
    </div>
    <div :key="inquiry.inquiry_no" v-for="inquiry in internalData.inquiry_list">
      <div class="center">
        <div class="circle"></div>
        <span class="time">{{ inquiry.updated_time }}</span>
      </div>

      <div class="detail">
        <div class="info">
          <div class="left">
            <span class="name">{{ inquiry.family_name }}</span>
            <span class="age">{{ inquiry.sex }}</span>
            <span class="age">{{ inquiry.age }}</span>
            <el-tag>{{ inquiry.relation }}</el-tag>
          </div>
          <div class="right">
            <el-button @click="showDetail(inquiry)" type="text">查看详情</el-button>
          </div>
        </div>

        <hr>

        <div class="chat">
          <span class="title">病情描述：</span>
          <span v-html="inquiry.DESCRIBE"></span>
        </div>
        <div class="tag">
          <el-tag size="medium" type v-if="inquiry.case_no">
            <img src="./../../../assets/images/icons/clinic/ic_bingli@2x.png">病历
          </el-tag>
          <el-tag size="medium" type v-if="inquiry.prescribe_prescrip_count">
            <img src="./../../../assets/images/icons/clinic/ic_chuf@2x.png">处方
          </el-tag>
          <el-tag size="medium" type v-if="inquiry.referral_count">
            <img src="./../../../assets/images/icons/clinic/ic_zhuanzhen@2x.png">转诊单
          </el-tag>
        </div>
      </div>
    </div>

    <peace-dialog :visible.sync="dialog.visible" append-to-body title="图文问诊记录" width="800px">
      <chat-session-list :localSessionMsgs="dialog.data"></chat-session-list>
    </peace-dialog>
  </div>
</template>

<script>
import ChatSessionList from './../../clinic/ChatSessionList'

import config from './config'
import { STATE } from './../../clinic/util'

export default {
  components: {
    ChatSessionList
  },

  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      config,

      STATE,

      dialog: {
        visible: false,

        data: []
      }
    }
  },

  computed: {
    internalData() {
      return this.data
    }
  },

  methods: {
    showDetail(row) {
      this.dialog.data = []
      this.dialog.visible = true

      // 获取病历信息
      this.$http.get(this.config.api.getOneInquiry, { params: { inquiryNo: row.inquiry_no } }).then(res => {
        res.data.forEach(item => {
          item.custom = item.ext

          if (this.internalData.user_info.doctor_id === item.from) {
            item.flow = this.STATE.msgFlow['医生消息']
          } else if (this.internalData.user_info.patient_id === item.from) {
            item.flow = this.STATE.msgFlow['患者消息']
          }

          switch (item.type) {
            case 0:
              item.type = this.STATE.msgType['文本消息']
              item.text = item.body.msg
              break
            case 1:
              item.type = this.STATE.msgType['图片消息']
              item.file = item.body
              break
            case 2:
              item.type = this.STATE.msgType['语音消息']
              break
            case 3:
              item.type = this.STATE.msgType['视频消息']
              break
            case 4:
              item.type = this.STATE.msgType['地理信息']
              break
            case 6:
              item.type = this.STATE.msgType['文件']
              break
            case 7:
              item.type = this.STATE.msgType['自定义消息']
              break
            case 100:
              item.type = this.STATE.msgType['自定义消息']
              item.content = item.body
              break
          }
        })

        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: inline-flex;
  align-items: center;

  .header-img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    border-radius: 50%;
  }

  .header-info {
    .first-line {
      margin: 0 0 10px 0;

      .name {
        font-weight: bold;
        margin: 0 20px 0 0;
      }
      .sex {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }

    .second-line {
      .label {
        color: #8f8f8f;
        margin: 0 10px 0 0;
      }

      .value {
        font-weight: bold;
        margin: 0 40px 0 0;
      }
    }
  }
}

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
        margin: 0 10px 0 0;
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
        margin: 0 10px 0 0;
      }
    }
  }

  hr {
    margin: 5px 0;
  }
}
</style>
