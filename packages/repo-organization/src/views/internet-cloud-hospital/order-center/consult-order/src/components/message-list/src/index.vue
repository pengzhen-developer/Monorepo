
<template>
  <div class="message-list-chat-room">
    <template v-if="messageList && messageList.length">
      <div class="item">
        <div :key="message.time"
             :class="getMessageFlow(message)"
             class="message"
             v-for="(message ,index) in messageList">
          <MessageContainer :message="message"
                            :index="index"
                            :showTime="isShowMessageTime(message ,index) || showTimeDic[getMessageType(message)]"
                            :patientInfo="patientInfo"
                            :doctorInfo="doctorInfo"
                            :avatorClick="true"
                            :IsInFlamilyList="true"></MessageContainer>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Constant from './constant'

import MessageContainer from './components/MessageContainer'
export default {
  name: 'MessageList',
  props: {
    info: {
      type: Object
    }
  },

  components: {
    MessageContainer
  },

  data() {
    return {
      currentRecord: '',
      currentPres: '',
      recordDialogVisible: false,
      presDialogVisible: false,
      preliminary: {
        visible: false,
        data: {}
      },
      transfer: {
        visible: false,
        data: {}
      },
      consult: {
        visible: false,
        data: {}
      },
      checkOrder: {
        visible: false,
        data: {}
      },
      showTimeDic: {
        710: true, // 接诊
        731: true, // 审核处方通过
        740: true, // 结束问诊
        // 742: true, // 转诊
        // 743: true, // 会诊
        750: true, // 退诊
        760: true, // 取消问诊
        780: true, // 服务提醒
        792: true //问诊卡片
        // 900: true, // 接收随访
        // 910: true, // 随访结束
      }
    }
  },

  computed: {
    patientInfo() {
      return this.info && this.info.patientInfo
    },
    doctorInfo() {
      return this.info && this.info.doctorInfo
    },
    messageList() {
      let sessionMessages = this.info && this.info.msgInfo
      //组装聊天消息
      const historyMessageFormatHandler = (messages) => {
        if (messages && Array.isArray(messages)) {
          messages.forEach((message) => {
            const messageTypeMap = { 0: 'text', 1: 'image', 2: 'audio', 100: 'custom' }

            message.time = message.sendtime
            message.flow = this.doctorInfo.doctorId === message.from ? 'in' : 'out'
            message.type = messageTypeMap[message.type]
            message.text = message.body.msg
            message.content = message.body
            message.file = message.body
          })
        }
      }
      historyMessageFormatHandler(sessionMessages)
      // 过滤无效数据
      sessionMessages = sessionMessages.filter((message) => {
        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          // if (
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.INQUIRY_MESSAGE_TYPE.评价提示 ||
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.INQUIRY_MESSAGE_TYPE.转诊提示 ||
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.INQUIRY_MESSAGE_TYPE.会诊提示
          // )
          //   return false
        }
        //计算图片高度 -- 最大宽度200px
        if (message.type === 'image') {
          if (message.file.w > 200) {
            message.file.style = 'height:' + message.file.h / (message.file.w / 200) + 'px;'
            message.file.width = '200'
            message.file.height = parseFloat(message.file.h / (message.file.w / 200)).toFixed(2)
          } else {
            message.file.style = 'height:' + message.file.h + 'px;'
            message.file.width = message.file.w
            message.file.height = message.file.h
          }
        }
        return true
      })
      return sessionMessages
    }
  },

  methods: {
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
      const customCodeList = [
        Constant.INQUIRY_MESSAGE_TYPE.发起问诊,
        Constant.INQUIRY_MESSAGE_TYPE.接诊,
        Constant.INQUIRY_MESSAGE_TYPE.结束问诊,
        Constant.INQUIRY_MESSAGE_TYPE.评价提示,
        Constant.INQUIRY_MESSAGE_TYPE.转诊提示,
        Constant.INQUIRY_MESSAGE_TYPE.会诊提示,
        Constant.INQUIRY_MESSAGE_TYPE.退诊,
        Constant.INQUIRY_MESSAGE_TYPE.取消问诊,
        Constant.INQUIRY_MESSAGE_TYPE.服务提醒,
        Constant.INQUIRY_MESSAGE_TYPE.检验挂号单提醒,
        Constant.INQUIRY_MESSAGE_TYPE.检验单提醒,
        Constant.INQUIRY_MESSAGE_TYPE.审核处方通过
      ]

      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          if (customCodeList.includes(message.content.code)) {
            return 'system'
          }
        }
      }
      return message.flow
    }
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';
.message-header {
  background-image: url('./assets/images/bg-img.png');
}
.message-footer::after {
  background-image: url('./assets/images/arrow-right.jpg');
}
</style>