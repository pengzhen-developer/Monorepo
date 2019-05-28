<template>
  <div v-if="chat.session && chat.session.id">
    <!-- 标题 -->
    <div class="header">
      <div class="left">
        <h4>{{ chat.session.lastMsg.custom.patients.familyName }}</h4>
      </div>
      <div class="right">
        <h4 v-if="chat.session.lastMsg.custom.ext.talkState === STATE.talkState['未接诊']">{{ negativeDuration }}</h4>
        <h4 v-if="chat.session.lastMsg.custom.ext.talkState !== STATE.talkState['未接诊']">{{ positiveDuration }}</h4>
        <el-button @click="overConfirm" plain type="success" v-show="chat.session.lastMsg.custom.ext.talkState !== STATE.talkState['未接诊']">结束问诊</el-button>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <!-- 病历 -->
      <template v-if="medical.visible">
        <chat-session-medical @close="closeMedical"></chat-session-medical>
      </template>
      <!-- 处方 -->
      <template v-else-if="prescription.visible">
        <chat-session-prescription @close="closePrescription"></chat-session-prescription>
      </template>
      <!-- 双向转诊 -->
      <template v-else-if="transfer.visible">
        <chat-session-transfer @close="closeTransfer"></chat-session-transfer>
      </template>
      <!-- 双向转诊 -->
      <template v-else-if="consultation.visible">
        <chat-session-consultation @close="closeConsultation"></chat-session-consultation>
      </template>
      <!-- 医患问诊 -->
      <template v-else>
        <!-- 消息列表页 -->
        <el-scrollbar class="content-chat-list content-scrollbar">
          <chat-session-list></chat-session-list>
        </el-scrollbar>

        <!-- 未接诊 -->
        <template v-if="chat.session.lastMsg.custom.ext.talkState === STATE.talkState['未接诊']">
          <div class="receive">
            <div class="tip">
              <span>请注意，请</span>
              <span class="count-down">尽快</span>
              <span>接诊，未接诊将自动退费</span>
            </div>
            <div class="control">
              <div @click="refuseConfirm">
                <img src="~@/assets/images/icons/clinic/ic_refuse.png">
                <span>退诊</span>
              </div>
              <div @click="receive">
                <img src="~@/assets/images/icons/clinic/ic_accept.png">
                <span>接诊</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 已急诊 -->
        <template v-else>
          <chat-session-input @showConsultation="showConsultation" @showMedical="showMedical" @showPrescription="showPrescription" @showTransfer="showTransfer"></chat-session-input>
        </template>
      </template>
    </div>

    <peace-dialog :visible.sync="over.visible" class="over-dialog" title top="25vh" width="348px">
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
          <el-input placeholder style="display: inline-block; width: 150px" v-if="over.description === '其他'" v-model="over.otherDescription"></el-input>
        </el-radio-group>
      </el-radio-group>

      <hr>

      <div style="text-align: center;">
        <el-button @click="over.visible = false" type>取消</el-button>
        <el-button :disabled="!over.state" @click="overConfirmAgain" type="primary">确认</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { STATE } from './util'
import config from './config'

// 聊天列表
import ChatSessionList from './ChatSessionList'
// 输入项
import ChatSessionInput from './ChatSessionInput'
// 病历
import ChatSessionMedical from './ChatSessionMedical'
// 处方
import ChatSessionPrescription from './ChatSessionPrescription'
// 申请转诊
import ChatSessionTransfer from './ChatSessionTransfer'
// 申请会诊
import ChatSessionConsultation from './ChatSessionConsultation'

export default {
  components: {
    ChatSessionList,
    ChatSessionInput,
    ChatSessionMedical,
    ChatSessionPrescription,
    ChatSessionTransfer,
    ChatSessionConsultation
  },

  data() {
    return {
      STATE,
      config,

      // 已接诊计时
      positiveDuration: '',
      // 未接诊倒计时
      negativeDuration: '',

      over: {
        visible: false,

        // 是否解决患者问题?
        state: '',
        // 未解决原因
        description: '',
        // 未解决的其它原因
        otherDescription: ''
      },

      // 病历
      medical: {
        visible: false
      },
      // 处方
      prescription: {
        visible: false
      },
      // 申请转诊
      transfer: {
        visible: false
      },
      // 申请会诊
      consultation: {
        visible: false
      }
    }
  },

  computed: {
    ...mapState(['chat'])
  },

  watch: {
    'chat.session'(newValue, oldValue) {
      window.clearInterval(this.durationInterval)

      if (newValue && oldValue && newValue.id !== oldValue.id) {
        this.closeAllDialog()
      }

      // 获取当前问诊记录
      this.$http.post(this.config.api.getInquiryByNo, { inquiryNo: this.chat.session.lastMsg.custom.ext.inquiryNo }).then(res => {
        if (this.chat.session) {
          if (this.chat.session.lastMsg.custom.ext.talkState !== STATE.talkState['未接诊']) {
            this.durationInterval = setInterval(() => {
              this.positiveDuration = $peace.util.formatDuration(new Date() - new Date(res.data.created_time))
            }, 1000)
          }
        }
      })
    }
  },

  created() {},

  destroyed() {
    window.clearInterval(this.durationInterval)
  },

  methods: {
    ...mapMutations('chat', ['clearSession']),

    // 接诊
    receive() {
      const param = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        inquiryId: this.chat.session.lastMsg.custom.ext.inquiryId
      }

      this.$http.post(this.config.api.receiveInquiry, param).then(res => {
        $peace.util.alert(res.msg)
      })
    },

    // 退诊确认
    refuseConfirm() {
      $peace.util.confirm('退诊后自动退还问诊费用，请再次确定是否退诊。', undefined, { type: 'warning', confirmButtonText: '退诊' }, this.refuse)
    },

    // 退诊
    refuse(description) {
      const param = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        inquiryId: this.chat.session.lastMsg.custom.ext.inquiryId,
        over_cause: description
      }

      this.$http
        .post(this.config.api.quitInquiry, param)
        .then(res => {
          $peace.util.alert(res.msg)
        })
        .finally(() => {
          this.over.visible = false
        })
    },

    // 结束问诊确认
    overConfirm() {
      this.over.visible = true

      this.over.state = ''
      this.over.description = ''
      this.over.otherDescription = ''
    },

    // 结束问诊二次确认
    overConfirmAgain() {
      if (this.over.state === '已解决') {
        const param = {
          inquiryId: this.chat.session.lastMsg.custom.ext.inquiryId
        }

        // 验证是否可结束
        this.$http
          .post(this.config.api.checkOverInquiry, param)
          .then(res => {
            // 非有效会话，提示退诊
            if (res.data.status === 1) {
              $peace.util.confirm('非有效会话，此时结束咨询将做退诊处理，确定退诊吗？', undefined, { type: 'warning', confirmButtonText: '退诊' }, () => {
                this.refuse()
              })
            }
            // 未填写病历，提示填写病历
            else if (res.data.caseStatus === 1) {
              $peace.util.confirm('请填写病历', undefined, { type: 'warning' }, () => {
                this.over.visible = false
                this.showMedical()
              })
            }
            // 可正常结束
            else if (res.data.caseStatus === 2 && res.data.status === 2) {
              const param = {
                doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
                inquiryId: this.chat.session.lastMsg.custom.ext.inquiryId
              }

              this.$http
                .post(this.config.api.overInquiry, param)
                .then(res => {
                  $peace.util.alert(res.msg)

                  this.over.visible = false
                  this.clearSession()
                })
                .finally(() => {
                  this.over.visible = false
                })
            }
            // 未知情况
            else {
              $peace.util.warning(res.msg)
            }
          })
          .finally(() => {
            this.over.visible = false
          })
      } else if (this.over.state === '未解决') {
        const description = this.over.description === '其他' ? this.over.otherDescription : this.over.description

        if (!description) {
          $peace.util.warning('请选择未解决原因。')
        } else {
          $peace.util.confirm('未解决用户问题，此时结束咨询将做退诊处理，确定退诊吗？', undefined, { type: 'warning', confirmButtonText: '退诊' }, () => {
            this.refuse(description)
          })
        }
      }
    },

    // 写病历
    showMedical() {
      this.medical.visible = true
    },

    // 关闭写病历页面
    closeMedical() {
      this.medical.visible = false
    },

    // 显示写处方页面
    showPrescription() {
      this.prescription.visible = true
    },
    // 关闭写处方页面
    closePrescription() {
      this.prescription.visible = false
    },

    // 显示申请转诊页面
    showTransfer() {
      this.transfer.visible = true
    },
    // 关闭申请转诊页面
    closeTransfer() {
      this.transfer.visible = false
    },

    // 显示申请会诊页面
    showConsultation() {
      this.consultation.visible = true
    },
    // 关闭申请会诊页面
    closeConsultation() {
      this.consultation.visible = false
    },

    // 关闭所有弹框
    closeAllDialog() {
      this.closeMedical()
      this.closePrescription()
      this.closeTransfer()
      this.closeConsultation()
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

  border-bottom: 1px solid #f2f2f2;
  background: #f9f9f9;

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
  height: calc(100% - 50px);

  &-chat-list {
    border-bottom: 1px solid #f2f2f2;
  }

  &-scrollbar {
    height: calc(100% - 200px);
  }

  .receive {
    width: 310px;
    margin: 0 auto;

    .tip {
      padding: 40px 0;
      color: #333333;
      text-align: center;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      width: 19rem;
      display: inline-block;

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

