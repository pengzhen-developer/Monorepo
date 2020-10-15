
<template>
  <div>
    <!-- 待接诊   -->
    <template v-if="type === 'inquiry' && $store.getters['inquiry/inquiryInfo'].inquiryStatus === constant.INQUIRY_STATUS.待接诊">
      <InquiryPreliminaryForReceive v-if="messageList && messageList[0]"
                                    :data="messageList[0].content.data">
      </InquiryPreliminaryForReceive>
    </template>
    <template v-else>
      <div class="message-list-chat-room">
        <template v-if="messageList && messageList.length">
          <div class="item">
            <div :key="message.time"
                 :class="getMessageFlow(message)"
                 class="message"
                 v-for="(message ,index) in messageList">
              <MessageContainer :message="message"
                                :index="index"
                                :showTime="isShowMessageTime(message ,index)"
                                :patientInfo="currentPatientInfo"
                                :doctorInfo="currentDoctorInfo"
                                :avatorClick="false"
                                :IsInFlamilyList="true"></MessageContainer>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>

</template>
<script>
//
import Constant from './constant'

import InquiryPreliminaryForReceive from '@src/views/components/inquiry/InquiryPreliminaryForReceive'

import MessageContainer from './components/MessageContainer'
export default {
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
        return 'inquiry'
      }
    },

    patientInfo: {
      type: Object,
      default() {
        return undefined
      }
    },

    doctorInfo: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  components: {
    InquiryPreliminaryForReceive,
    MessageContainer
  },

  data() {
    return {
      constant: Constant
    }
  },

  watch: {
    '$store.state.inquiry.sessionMessages': {
      handler() {
        this.scrollMessageToBottom()
      },
      immediate: true
    }
  },

  activated() {
    this.scrollMessageToBottom()
    console.log('activated')
  },
  computed: {
    currentPatientInfo() {
      return this.patientInfo || this.$store.getters['inquiry/patientInfo']
    },
    currentDoctorInfo() {
      return this.doctorInfo || this.$store.getters['inquiry/doctorInfo']
    },
    messageList() {
      let sessionMessages = this.data || this.$store.state.inquiry.sessionMessages

      // 过滤无效数据
      sessionMessages = sessionMessages.filter((message) => {
        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          if (
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.会诊提示
          )
            return false
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
    scrollMessageToBottom() {
      this.$nextTick(function () {
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
    //2019年11月11日
    formDate(time) {
      time = new Date(time)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      return y + '年' + m + '月' + d + '日'
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
          if (
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.接诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.退诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.服务提醒
          ) {
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