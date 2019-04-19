<template>
  <div>
    <ul>
      <li :key="msg.time" v-for="msg in internalSessionMsgs">
        <template v-if="getMsgType(msg) === state.msgType['文本消息'] ">
          <div :class="getMsgFlow(msg)" class="msg-body">
            <span class="msg-detail" v-html="msg.text"></span>
          </div>
        </template>

        <template v-if="getMsgType(msg) === state.msgType['图片消息'] ">
          <div :class="getMsgFlow(msg)" :style="{ width: msg.file.w, height: msg.file.h }" class="msg-body">
            <img :height="msg.file.h" :src="msg.file.url" :width="msg.file.w">
          </div>
        </template>

        <template v-if="getMsgType(msg) === state.msgType['视频消息'] ">
          <span>TODO: [ 通话时长 10:32]</span>
        </template>

        <template v-if="getMsgType(msg) === state.msgType['自定义消息'] ">
          <div :class="getMsgFlow(msg)" class="msg-body">
            <template v-if="getMsgFlow(msg) === state.msgFlow['患者消息'] ">
              <span>TODO: 目前情况, 暂无此情况</span>
            </template>

            <template v-if="getMsgFlow(msg) === state.msgFlow['医生消息'] ">
              <div @click="showMedical(msg)" class="msg-detail medical" v-if="getSendType(msg) === state.sendType['病历消息']">
                <img src="./../../assets/images/icons/clinic/ic_rp.png">
                <div>
                  <p>病历</p>
                  <p>查看详情</p>
                </div>
              </div>
              <div @click="showPrescription(msg)" class="msg-detail prescription" v-if="getSendType(msg) === state.sendType['处方消息']">
                <img src="./../../assets/images/icons/clinic/ic_medical record.png">
                <div>
                  <p>处方</p>
                  <p>查看详情</p>
                </div>
              </div>
            </template>

            <template v-if="getMsgFlow(msg) === state.msgFlow['系统消息'] ">
              <span class="msg-detail" v-html="msg.content.data.appMsg"></span>
            </template>
          </div>
        </template>
      </li>
    </ul>

    <el-dialog :visible.sync="medical.visible" width="562px">
      <chat-session-medical-detail :data="medical.data"></chat-session-medical-detail>
    </el-dialog>

    <el-dialog :visible.sync="prescription.visible" width="562px">
      <chat-session-prescription-detail :data="prescription.data"></chat-session-prescription-detail>
    </el-dialog>
  </div>
</template>

<script>
import { state } from './util'

import ChatSessionMedicalDetail from './ChatSessionMedicalDetail'
import ChatSessionPrescriptionDetail from './ChatSessionPrescriptionDetail'

export default {
  components: {
    ChatSessionMedicalDetail,
    ChatSessionPrescriptionDetail
  },

  props: {
    sessionMsgs: {
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

      state,

      medical: {
        visible: false,

        data: undefined
      },

      prescription: {
        visible: false,

        data: undefined
      }
    }
  },

  computed: {
    internalSessionMsgs() {
      return this.sessionMsgs
    }
  },

  methods: {
    getMsgType(msg) {
      return msg.type
    },

    getMsgFlow(msg) {
      // 后台系统消息
      if (msg.content && msg.content.type == 8) {
        return this.state.msgFlow['系统消息']
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

  &.system {
    justify-content: center;

    .msg-detail {
      color: rgba(155, 155, 155, 1);
    }
  }

  &.in {
    margin-left: 5px;
    justify-content: flex-start;

    .msg-detail {
      background: rgba(243, 243, 243, 1);
      color: rgba(51, 51, 51, 1);
      border-radius: 4px;
      padding: 6px 10px 6px 10px;
    }
  }

  &.out {
    margin-right: 10px;
    justify-content: flex-end;

    .msg-detail {
      background: rgba(0, 198, 174, 1);
      color: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 6px 10px 6px 10px;

      &.medical,
      &.prescription {
        cursor: pointer;
        display: inline-flex;

        p {
          margin: 0 0 2px 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
