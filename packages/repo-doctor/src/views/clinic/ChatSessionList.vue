<template>
  <div>
    <ul>
      <li :key="msg.time" v-for="(msg, index) in recentSessionMsgs">
        <div class="msg-body system system-time" v-if="needShowMsgTime(index)">{{ showMsgTime(msg) }}</div>

        <template v-if="getMsgType(msg) === STATE.msgType['文本消息'] ">
          <div :class="getMsgFlow(msg)" class="msg-body">
            <span class="msg-detail" v-html="msg.text"></span>
          </div>
        </template>

        <template v-if="getMsgType(msg) === STATE.msgType['图片消息'] ">
          <div :class="getMsgFlow(msg)" :style="{ height: (msg.file.h > 400 ? 400 * 0.75 : msg.file.h) + 10 + 'px' }" class="msg-body msg-detail image">
            <img :src="msg.file.url" @click="previewImg(msg.file)" class="msg-detail">
          </div>
        </template>

        <template v-if="getMsgType(msg) === STATE.msgType['视频消息'] ">
          <span>TODO: [ 通话时长 10:32]</span>
        </template>

        <template v-if="getMsgType(msg) === STATE.msgType['自定义消息'] ">
          <div :class="getMsgFlow(msg)" class="msg-body">
            <template v-if="getMsgFlow(msg) === STATE.msgFlow['患者消息'] ">
              <!-- <span>TODO: 目前需求, 暂无此情况</span> -->
            </template>

            <template v-if="getMsgFlow(msg) === STATE.msgFlow['医生消息'] ">
              <div @click="showMedical(msg)" class="msg-detail medical" v-if="getSendType(msg) === STATE.sendType['病历消息']">
                <img src="./../../assets/images/icons/clinic/ic_rp.png">
                <div>
                  <p style="font-size: 14px;">病历</p>
                  <p>查看详情</p>
                </div>
              </div>
              <div @click="showPrescription(msg)" class="msg-detail prescription" v-if="getSendType(msg) === STATE.sendType['处方消息']">
                <img src="./../../assets/images/icons/clinic/ic_medical record.png">
                <div>
                  <p>处方</p>
                  <p>查看详情</p>
                </div>
              </div>
            </template>

            <template v-if="getMsgFlow(msg) === STATE.msgFlow['系统消息'] ">
              <span class="msg-detail" v-html="msg.content.data.appMsg"></span>
            </template>
          </div>
        </template>
      </li>
    </ul>

    <peace-dialog :visible.sync="medical.visible" append-to-body width="562px">
      <chat-session-medical-detail :data="medical.data"></chat-session-medical-detail>
    </peace-dialog>

    <peace-dialog :visible.sync="prescription.visible" append-to-body width="562px">
      <chat-session-prescription-detail :data="prescription.data"></chat-session-prescription-detail>
    </peace-dialog>

    <peace-dialog :visible.sync="image.visible" append-to-body class="preview-image" title="文件预览" top="5vh">
      <img :src="image.model.url" @click="image.visible = false">
    </peace-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { STATE, DeserializationSessionMsgs } from './util'

import ChatSessionMedicalDetail from './ChatSessionMedicalDetail'
import ChatSessionPrescriptionDetail from './ChatSessionPrescriptionDetail'

export default {
  components: {
    ChatSessionMedicalDetail,
    ChatSessionPrescriptionDetail
  },

  props: {
    localSessionMsgs: {
      type: Array,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      api: {
        getCase: 'client/v1/inquiry/getCase',
        getPrescription: 'client/v1/Prescribeprescrip/getPrescripInfo'
      },

      STATE,

      medical: {
        visible: false,

        data: undefined
      },

      prescription: {
        visible: false,

        data: undefined
      },

      image: {
        visible: false,
        model: {}
      }
    }
  },

  computed: {
    ...mapState(['chat']),

    // 最近一次就诊
    recentSessionMsgs() {
      let recentSessionMsgs

      if (this.chat.sessionMsgs) {
        const msgs = DeserializationSessionMsgs(this.chat.sessionMsgs.msgs)

        // 过滤历史记录到最近一次就诊
        let notReciveindex = msgs.findIndex(item => item.custom.ext.talkState === 1)
        let hasReciveindex = msgs
          .concat([])
          .splice(notReciveindex)
          .findIndex(item => item.custom.ext.talkState !== 1)

        notReciveindex = notReciveindex === -1 ? msgs.length : notReciveindex
        hasReciveindex = hasReciveindex === -1 ? msgs.length : hasReciveindex

        recentSessionMsgs = msgs.splice(0, notReciveindex + hasReciveindex).reverse()

        this.scrollToBottom()
      }

      return this.localSessionMsgs || recentSessionMsgs
    }
  },

  methods: {
    // 是否需要显示系统时间
    needShowMsgTime(index) {
      if (index === 0) {
        return true
      } else {
        const prevMsg = this.recentSessionMsgs[index - 1]
        const currentMsg = this.recentSessionMsgs[index]

        if (currentMsg.time - prevMsg.time >= 1000 * 60 * 2) {
          return true
        }

        return false
      }
    },

    showMsgTime(msg) {
      const time = msg.time || msg.sendtime

      return time.toDate().formatDate('MM月dd日 HH:mm:ss')
    },

    getMsgType(msg) {
      return msg.type
    },

    getMsgFlow(msg) {
      // 后台系统消息
      if (msg.content && msg.content.type == 8) {
        return this.STATE.msgFlow['系统消息']
      }

      return msg.flow
    },

    getSendType(msg) {
      return msg.content.data.sendType
    },

    // 显示已发送的病历详情
    showMedical(msg) {
      this.medical.visible = true

      // 获取病历信息
      this.$http.post(this.api.getCase, { inquiry_no: msg.custom.ext.inquiryNo }).then(res => {
        this.medical.data = { ...res.data }
      })
    },

    // 显示已发送的处方详情
    showPrescription(msg) {
      this.prescription.visible = true

      // 获取处方信息
      this.$http.get(this.api.getPrescription, { params: { prescriptionId: msg.content.data.prescriptionId } }).then(res => {
        this.prescription.data = { ...res.data }
      })
    },

    // 预览图片
    previewImg(file) {
      this.image.visible = true
      this.image.model = file
    },

    // 滚动到最底部
    scrollToBottom() {
      this.$nextTick().then(() => {
        const scrollElement = document.body.querySelector('.content-chat-list .el-scrollbar__wrap')
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.msg-body {
  display: flex;
  align-items: center;

  margin: 5px 0;

  &.image {
    img {
      cursor: zoom-in;
      max-width: 400px;
      max-height: 300px;
    }

    .msg-detail {
      border: 1px solid #f3f3f3;
      padding: 0 !important;
      margin: 0 !important;
    }
  }

  &.system {
    justify-content: center;

    .msg-detail {
      padding: 4px 10px;
      margin: 6px 0;
      color: rgba(155, 155, 155, 1);
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
    }
  }

  &.system-time {
    color: #9b9b9b;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  &.in {
    margin-left: 5px;
    justify-content: flex-start;

    .msg-detail {
      background: rgba(243, 243, 243, 1);
      color: rgba(51, 51, 51, 1);
      border-radius: 4px;
      padding: 6px 10px 6px 10px;
      margin: 6px 0;
      display: inline-block;
      max-width: 60%;
      word-break: break-all;
      white-space: normal;
    }
  }

  &.out {
    margin-right: 10px;
    justify-content: flex-end;

    .msg-detail {
      background: #00c6ae;
      color: #ffffff;
      border-radius: 4px;
      padding: 6px 10px 6px 10px;
      margin: 6px 0;
      display: inline-block;
      max-width: 60%;
      word-break: break-all;
      white-space: normal;

      &.medical,
      &.prescription {
        background: #fff;
        border: 1px solid #f2f2f2;
        padding: 10px 12px;
        cursor: pointer;
        display: inline-flex;

        p {
          margin: 0 0 2px 10px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}

.preview-image {
  overflow: hidden;

  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog {
    height: 90vh;
    margin: 5vh auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .el-dialog,
  /deep/ .el-dialog__body {
    background: transparent;
    border: none;
    box-shadow: none;

    img {
      cursor: zoom-out;
      max-width: 100vw;
      max-height: 90vh;
    }
  }
}
</style>
