<template>
  <div class="consultation-session-message-list">

    <!-- 待接诊 -->
    <template v-if="type === 'consult' && !data && $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核">
      <ConsultationSessionReceiveDetail></ConsultationSessionReceiveDetail>
    </template>

    <!-- 已接诊 -->
    <template v-else>
      <div :class="getMessageFlow(message)"
           :key="message.time"
           class="message"
           v-for="(message ,index) in messageList">
        <!-- 文本消息 -->
        <template v-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.邀请协同会诊 || 
              getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body"
               v-html="getMessageText(message)"></div>
        </template>

        <!-- 解散频道时，推送会诊时长 -->
        <template v-else-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.解散频道 || 
                             getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body">
            <i class="icon_ic_video_right"
               style="margin: 0 10px 0 0;"
               v-show="getMessageFlow(message) === 'in'"></i>
            <span>{{ getMessageText(message) }}</span>
            <i class="icon_ic_video_left"
               style="margin: 0 0 0 10px;"
               v-show="getMessageFlow(message) === 'out'"></i>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import ConsultationSessionReceiveDetail from './ConsultationSessionReceiveDetail'

export default {
  components: {
    ConsultationSessionReceiveDetail
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    },

    type: {
      type: String,
      default() {
        return 'consult'
      }
    }
  },

  data() {
    return {
      caseDetail: {
        visible: false,
        data: {}
      },

      recipeDetail: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    messageList() {
      let sessionMessages = this.data || this.$store.state.consultation.sessionMessages

      // 过滤无效数据
      sessionMessages = sessionMessages.filter(message => {
        // 屏蔽未知消息
        if (!message.type) {
          return false
        }

        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          if (
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.邀请协同会诊 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.解散频道 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录
          )
            return false
        }

        return true
      })

      return sessionMessages
    }
  },

  watch: {
    '$store.state.consultation.sessionMessages': {
      handler() {
        // this.scrollMessageToBottom()
      },
      immediate: true
    }
  },

  activated() {
    this.scrollMessageToBottom()
  },

  methods: {
    scrollMessageToBottom() {
      this.$nextTick(function() {
        const element = document.querySelector('.message-list-scrollbar .el-scrollbar__wrap')

        if (element) {
          element.scrollTop = element.scrollHeight
        }
      })
    },

    // 是否需要显示系统时间
    isShowMessageTime(message, index) {
      if (index === 0) {
        return true
      } else {
        const prevMessage = this.messageList[index - 1]
        const currentMessage = this.messageList[index]

        if (currentMessage.time - prevMessage.time >= 1000 * 60 * 3) {
          return true
        }

        return false
      }
    },

    getMessageType(message) {
      // text
      // image
      // custom
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          return message.content.code
        }
      } else {
        return message.type
      }
    },

    getMessageFlow(message) {
      // out
      // in
      // system
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          if (message.content.code === peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    getMessageText(message) {
      if (message.content && message.content.data && message.content.data.showTextInfo) {
        // 视频记录需要区分发起与受邀

        if (this.getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录) {
          if (this.getHangupConsultRole(message) === 'from') {
            return message.content.data.showTextInfo.doctorClientText
          } else {
            return message.content.data.showTextInfo.patientClientText
          }
        }

        return message.content.data.showTextInfo.doctorClientText
      }

      if (message.text) {
        return message.text
      }
    },

    getHangupConsultRole(message) {
      const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id
      const startDoctorList = message.content.data.consultInfo.startDoctor
      const receiveDoctorList = message.content.data.consultInfo.receiveDoctor

      if (startDoctorList.find(item => item.doctorId === doctorId)) {
        return 'from'
      }

      if (receiveDoctorList.find(item => item.doctorId === doctorId)) {
        return 'to'
      }

      return new Error('当前医生未找到角色')
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-session-message-list {
  padding: 10px 10px 0 10px;

  .message {
    margin: 0 0 10px 0;

    &.in {
      text-align: left;

      .message-body {
        color: rgba(51, 51, 51, 1);
        background: rgba(243, 243, 243, 1);
      }
    }

    &.out {
      text-align: right;

      .message-body {
        color: rgba(255, 255, 255, 1);
        background: rgba(0, 198, 174, 1);
      }
    }

    &.system {
      text-align: center;
      margin: 10px auto;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgba(242, 242, 242, 1);
      }
    }

    &.time {
      font-size: 12px;
      text-align: center;
      margin: 0;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgb(255, 255, 255);
      }
    }

    .message-body {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 4px;
      max-width: 80%;

      &.case,
      &.recipe {
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
</style>

