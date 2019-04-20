<template>
  <div v-if="internalSession && internalSession.id">
    <div class="header">
      <div class="left">
        <h4>{{ internalSession && internalSession.lastMsg.custom.patients.familyName }}</h4>
      </div>
      <div class="right">
        <h4>{{ countDown }}</h4>
        <el-button @click="showOver" plain type="success">结束问诊</el-button>
      </div>
    </div>

    <div class="content">
      <el-scrollbar class="scrollbar">
        <!-- 聊天列表 -->
        <div v-show="!medical.visible && !prescription.visible">
          <chat-session-list :sessionMsgs="sessionMsgs"></chat-session-list>
        </div>
        <!-- 病历 -->
        <template v-if="medical.visible">
          <chat-session-medical :session="lastSession" @close="closeMedical" @updateMsgHistory="updateMsgHistory"></chat-session-medical>
        </template>
        <!-- 处方 -->
        <template v-if="prescription.visible">
          <chat-session-prescription :session="lastSession" @close="closePrescription" @updateMsgHistory="updateMsgHistory"></chat-session-prescription>
        </template>
      </el-scrollbar>
    </div>

    <template v-if="internalSession && internalSession.lastMsg.custom.ext.talkState === state.talkState['未接诊']">
      <div class="receive">
        <div class="tip">
          <span>请注意，请在</span>
          <span class="count-down">限时时间</span>
          <span>内接诊，未接诊将自动退费</span>
        </div>
        <div class="control">
          <div @click="refuse">
            <img src="./../../assets/images/icons/clinic/ic_refuse.png">
            <span>退诊</span>
          </div>
          <div @click="receive">
            <img src="./../../assets/images/icons/clinic/ic_accept.png">
            <span>接诊</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="input">
        <chat-session-input :sessionMsgs="sessionMsgs" @showMedical="showMedical" @showPrescription="showPrescription" @updateMsgHistory="updateMsgHistory"></chat-session-input>
      </div>
    </template>

    <el-dialog :visible.sync="over.visible" class="over-dialog" title top="25vh" width="348px">
      <h4 style="margin: 0 0 30px 0; font-size: 18px;">您是否已经解决了患者的问题？</h4>

      <el-radio-group v-model="over.state">
        <el-radio label="已解决" style="margin: 0 0 20px 0;">已解决</el-radio>
        <br>
        <el-radio label="未解决" style="margin: 0 0 20px 0;">未解决</el-radio>
        <br>

        <el-radio-group style="margin: 0 0 5px 20px;" v-if="over.state === '未解决' " v-model="over.description">
          <el-radio label="不对症" style="margin: 0 0 20px 0;">不对症</el-radio>
          <br>
          <el-radio label="缺少诊疗依据" style="margin: 0 0 20px 0;">缺少诊疗依据</el-radio>
          <br>
          <el-radio label="其他">其他</el-radio>
          <el-input placeholder style="display: inline-block; width: 150px" v-if="over.description === '其他'" v-model="over.other"></el-input>
        </el-radio-group>
      </el-radio-group>

      <hr>

      <div style="text-align: center;">
        <el-button @click="over.visible = false" type>取消</el-button>
        <el-button @click="overConfirm" type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isArray } from 'util'
import { state, deserializationSessions, deserializationSessionMsgs } from './util'

// 病历
import ChatSessionMedical from './ChatSessionMedical'
// 处方
import ChatSessionPrescription from './ChatSessionPrescription'
// 聊天列表
import ChatSessionList from './ChatSessionList'
// 输入项
import ChatSessionInput from './ChatSessionInput'

export default {
  components: {
    ChatSessionList,
    ChatSessionInput,
    ChatSessionMedical,
    ChatSessionPrescription
  },

  props: {
    session: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      api: {
        // 接受问诊
        receiveInquiry: 'client/v1/patient/receiveInquiry',
        // 退出问诊
        quitInquiry: 'client/v1/patient/quitInquiry',
        // 正常结束问诊
        overInquiry: 'client/v1/patient/overInquiry'
      },

      state,

      // 历史记录详情
      sessionMsgs: undefined,
      // 最后一条消息
      lastSession: undefined,

      // 病历
      medical: {
        visible: false
      },

      // 处方
      prescription: {
        visible: false
      },

      // 结束问诊
      over: {
        visible: false,

        // 退诊是否解决问题?
        state: '已解决',

        // 不满意原因
        description: '',
        // 其他原因
        other: ''
      },

      countDown: undefined
    }
  },

  created() {
    const countDown = new Date().proDate('{%H+1}')

    this.countDownInterval = setInterval(() => {
      this.countDown = (countDown.getTime() - new Date().getTime()).toDate().formatDate('mm:ss')
    }, 1000)
  },

  destroyed() {
    window.clearInterval(this.countDownInterval)
  },

  computed: {
    internalSession() {
      if (this.session) {
        return deserializationSessions([this.session])[0]
      }

      return this.session
    }
  },

  watch: {
    internalSession() {
      if (this.internalSession && this.internalSession.to) {
        this.getMsgHistory()
      }
    },

    sessionMsgs() {
      this.$nextTick(function() {
        // 滚动到最底部
        const scrollElement = this.$el.querySelector('.layout-center .el-scrollbar__wrap')
        scrollElement.scrollTop = scrollElement.scrollHeight
      })
    }
  },

  methods: {
    // 获取当前消息的历史消息记录
    getMsgHistory() {
      $peace.NIM.getHistoryMsgs({
        scene: 'p2p',
        to: this.internalSession.to,
        done: (error, obj) => {
          console.log('获取历史消息', obj)

          const msgs = deserializationSessionMsgs(obj.msgs)

          // 获取最近一次就诊全记录
          // [ 2,1,1,2,2,1 ]
          // 以上数据, 需要获取 [ 2,1,1 ]

          // 从 [0] 开始, 筛选最近一条 '未接诊'
          let notReciveindex = msgs.findIndex(item => item.custom.ext.talkState === 1)
          // 从 [最近一条未接诊] 开始, 筛选最近一条 '非未接诊'
          let hasReciveindex = msgs
            .concat([])
            .splice(notReciveindex)
            .findIndex(item => item.custom.ext.talkState !== 1)

          notReciveindex = notReciveindex === -1 ? msgs.length : notReciveindex
          hasReciveindex = hasReciveindex === -1 ? msgs.length : hasReciveindex

          this.sessionMsgs = msgs.splice(0, notReciveindex + hasReciveindex).reverse()
          this.lastSession = this.sessionMsgs[this.sessionMsgs.length - 1]
        }
      })
    },

    // 更新当前消息的历史消息记录
    updateMsgHistory(msg) {
      if (this.internalSession && this.internalSession.id === msg.sessionId) {
        if (isArray(msg)) {
          msg = deserializationSessionMsgs(msg)
        } else {
          msg = deserializationSessionMsgs([msg])
        }

        this.sessionMsgs = this.sessionMsgs.concat(msg)
        this.lastSession = this.sessionMsgs[this.sessionMsgs.length - 1]
      }
    },

    // 显示写病历页面
    showMedical() {
      this.medical.visible = true
    },

    // 关闭写病历页面
    closeMedical() {
      this.medical.visible = false

      this.$nextTick().then(() => {
        // 滚动到最底部
        const scrollElement = this.$el.querySelector('.layout-center .el-scrollbar__wrap')
        scrollElement.scrollTop = scrollElement.scrollHeight
      })
    },

    // 显示写处方页面
    showPrescription() {
      this.prescription.visible = true
    },

    // 关闭写处方页面
    closePrescription() {
      this.prescription.visible = false

      this.$nextTick().then(() => {
        // 滚动到最底部
        const scrollElement = this.$el.querySelector('.layout-center .el-scrollbar__wrap')
        scrollElement.scrollTop = scrollElement.scrollHeight
      })
    },

    // 显示退诊咨询狂
    showOver() {
      this.over.visible = true
    },

    // 结束问诊
    overConfirm() {
      // 结束问诊流程
      if (this.over.state === '已解决') {
        const param = {
          doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
          inquiryId: this.internalSession.lastMsg.custom.ext.inquiryId
        }
        this.$http.post(this.api.overInquiry, param).then(res => {
          $peace.util.alert(res.msg)

          this.over.visible = false
          this.$emit('clear')
        })
      }
      // 退诊退费流程
      else if (this.over.state === '未解决') {
        const description = this.over.description === '其他' ? this.over.other : this.over.description

        this.refuse(description)
      }
    },

    // 接诊
    receive() {
      const param = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        inquiryId: this.internalSession.lastMsg.custom.ext.inquiryId
      }
      this.$http.post(this.api.receiveInquiry, param).then(res => {
        $peace.util.alert(res.msg)

        // 更新当前 session 状态
        $peace.$set(this.internalSession.lastMsg, 'custom', res.data.ext)
      })
    },

    // 退诊
    refuse(over_cause) {
      const handleRefuse = () => {
        const param = {
          doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
          inquiryId: this.internalSession.lastMsg.custom.ext.inquiryId,
          over_cause: over_cause
        }
        this.$http.post(this.api.quitInquiry, param).then(res => {
          $peace.util.alert(res.msg)

          this.over.visible = false
          this.$emit('clear')
        })
      }

      if (over_cause instanceof MouseEvent) {
        $peace.util.confirm('退诊后自动退还问诊费用，确定退诊吗？', undefined, 'warning', () => {
          handleRefuse()
        })
      } else {
        handleRefuse()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  background: rgba(249, 249, 249, 1);

  .left {
    img {
      margin-right: 10px;
    }

    h4 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 0 10px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 10px 0 0;

    h4 {
      margin: 0 20px 0 0;
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 198, 174, 1);
    }
  }
}

.content {
  height: calc(100% - 250px);

  .scrollbar {
    height: 100%;
  }
}

.receive {
  width: 310px;
  margin: 0 auto;

  .tip {
    margin: 40px 0;

    color: #333333;

    .count-down {
      font-weight: bold;
      color: #00c6ae;
    }
  }

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      flex-flow: column;

      cursor: pointer;
    }
  }
}

/deep/ .el-upload-list__item {
  display: none;
}

.over-dialog {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>
