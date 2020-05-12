
<template>
  <div class="message-list-chat-room">
    <template v-if="messageList && messageList.length">
      <div @click="hideTools"
           class="item">
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
                            :IsInFlamilyList="IsInFlamilyList"></MessageContainer>
        </div>

        <div class="h63"
             v-if="canShowFooter"></div>
      </div>

      <div class="input"
           v-if="canShowInput">
        <van-field :autosize="{ maxHeight: 78, minHeight: 38 }"
                   @focus="hideTools"
                   rows="1"
                   type="textarea"
                   v-model.trim="message"
                   v-on:keyup.enter.stop="sendMessageText">
          <van-icon @click="showTools"
                    size='26px'
                    style="margin-top:6px;"
                    :name="require('./assets/images/ic_more_functions.png')"
                    slot="left-icon" />
          <van-button @click="sendMessageText"
                      size="small"
                      slot="button"
                      type="primary">发送
          </van-button>
        </van-field>

        <div class="input-tools"
             v-show="tools.visible">
          <van-row justify="space-between"
                   type="flex">
            <van-col class="flex-left"
                     span="6">
              <van-uploader :after-read="sendMessageImage">
                <div class="flex-center">
                  <van-button icon="photo"></van-button>
                  <p>图片</p>
                </div>
              </van-uploader>
            </van-col>
          </van-row>
        </div>
      </div>
    </template>

    <template v-else>
      <van-row style="height: 100%;"
               type="flex"
               align="center"
               justify="center">
        <van-loading />
      </van-row>
    </template>
    <template v-if="canShowFooter">
      <div class="footer">
        <div class="footer-item"
             v-if="infoData.consultNo"
             @click="gouserConsultationPage(infoData)">会诊单</div>
        <div class="footer-item"
             v-if="infoData.referralNo"
             @click="gouserTranforPage(infoData)">转诊单</div>
        <div class="footer-item"
             v-if="infoData.isCase"
             @click="gouserPrescripCasePage(infoData)">病历</div>
        <div class="footer-item"
             v-if="infoData.isPrescrip"
             @click="gouserPrescripListPage(infoData)">处方</div>
        <div class="footer-item"
             v-if="infoData.checkOrderNo"
             @click="gouserInspectionPage(infoData)">检查单</div>
      </div>
    </template>
    <template v-if="loading">
      <div class="loading">
        <van-loading />
        <!-- <el-loading></el-loading> -->
      </div>
    </template>
  </div>
</template>
<script>
import peace from '@src/library'
import Constant from './constant'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

import Compressor from 'compressorjs'

import MessageContainer from './components/MessageContainer'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    },

    navBar: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  components: {
    MessageContainer
  },

  data() {
    return {
      internalData: undefined,
      internalDoctorInfo: undefined,
      internalPatientInfo: undefined,
      infoData: undefined,
      message: '',
      loading: false,
      tools: {
        visible: false
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
      },
      params: {},
      hasSend: false,
      IsInFlamilyList: false
    }
  },

  watch: {
    messageList: {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.message-list-chat-room .item')

          if (element) {
            element.scrollTop = element.scrollHeight
          }
        })
      },
      immediate: true
    },
    'tools.visible': {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.message-list-chat-room .item')

          if (element) {
            element.scrollTop = element.scrollHeight
          }
        })
      },
      immediate: true
    },
    infoData: {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.message-list-chat-room .item')

          if (element) {
            element.scrollTop = element.scrollHeight
          }
        })
      },
      immediate: true
    },

    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },

  computed: {
    IM() {
      return (
        this.$store.state.inquiry.sessionsFamily[this.params.familyId] &&
        this.$store.state.inquiry.sessionsFamily[this.params.familyId].im
      )
    },
    patientInfo() {
      return this.internalPatientInfo || this.$store.getters['inquiry/patientInfo']
    },
    doctorInfo() {
      return this.internalDoctorInfo || this.$store.getters['inquiry/doctorInfo']
    },
    messageList() {
      let sessionMessages = this.internalData || this.$store.state.inquiry.sessionMessages
      // 过滤无效数据
      sessionMessages = sessionMessages.filter(message => {
        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          // if (
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.评价提示 ||
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.转诊提示 ||
          //   message.content.code === Constant.INQUIRY_MESSAGE_TYPE.会诊提示
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
    },

    canShowInput() {
      if (
        this.$store.getters['inquiry/inquiryInfo'].inquiryStatus === Constant.INQUIRY_STATUS.待接诊 ||
        this.$store.getters['inquiry/inquiryInfo'].inquiryStatus === Constant.INQUIRY_STATUS.问诊中
      ) {
        return true
      } else {
        return false
      }
    },

    canShowFooter() {
      return (
        this.infoData &&
        (this.infoData.inquiryStatus == '4' || this.infoData.inquiryStatus == '5') &&
        (this.infoData.consultNo ||
          this.infoData.referralNo ||
          this.infoData.isCase ||
          this.infoData.isPrescrip ||
          this.infoData.checkOrderNo)
      )
    }
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      // 清除聊天记录
      peace.service.IM.resetInquirySessionMessages()
      peace.service.IM.resetInquirySession()
      peace.cache.remove('familyId')
    })
  },
  activated() {
    this.params = peace.util.decode(this.$route.params.json)
    this.$nextTick().then(() => {
      if (!this.data) {
        // 传递 inquiryNo 获取聊天记录
        if (this.params.inquiryNo) {
          this.getHistoryMsgsByDB()
        }
        // 传递 session 获取聊天记录
        else {
          const interval = setInterval(() => {
            // 等待 IM 初始化完成，并且 sessions 已经获取到
            if (
              this.IM &&
              this.IM.isConnected() &&
              this.$store.state.inquiry.sessionsFamily[this.params.familyId].sessions.length > 0
            ) {
              window.clearInterval(interval)
              this.getInquiryInfo()
              this.getHistoryMsgsByIM()
            }
          }, 100)
        }
      }
    })
  },

  destroyed() {
    // 清除当前聊天 session
    peace.service.IM.resetInquirySession()
    // 清除聊天记录
    peace.service.IM.resetInquirySessionMessages()
  },

  methods: {
    getInquiryInfo() {
      let params = {
        sessionIdList: [this.params.id],
        familyId: this.params.familyId
      }
      peace.service.inquiry.getList(params).then(res => {
        this.internalDoctorInfo = res.data.list[0].doctorInfo
        this.internalPatientInfo = res.data.list[0].patientInfo
        this.checkFamilyIsInFlamilyList()
      })
    },
    //获取历史会话问诊状态、医生信息、患者信息及5个按钮是否展示
    getInfoData(inquiryId) {
      peace.service.patient.inquiryDetail({ inquiryId: inquiryId }).then(res => {
        res.data.inquiryInfo.familyId = res.data.familyInfo.familyId
        this.infoData = res.data.inquiryInfo
        this.internalPatientInfo = res.data.familyInfo
        this.internalDoctorInfo = res.data.doctorInfo
        this.checkFamilyIsInFlamilyList()
      })
    },
    //进行中会话获取医生信息、患者信息

    //获取历史会话数据
    getHistoryMsgsByDB() {
      peace.service.patient.chatDetail(this.params).then(res => {
        const historyMessageFormatHandler = messages => {
          if (messages && Array.isArray(messages)) {
            messages.forEach(message => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow = this.params.familyId === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.msgList)
        if (res.data.inquiryStatus == '4' || res.data.inquiryStatus == '5') {
          this.getInfoData(res.data.inquiryId)
        }
        this.internalData = res.data.msgList
        // this.internalDoctorInfo = res.data.doctorInfo
      })
    },

    //获取进行中会话数据
    getHistoryMsgsByIM() {
      const currrentSession = this.$store.state.inquiry.sessionsFamily[this.params.familyId].sessions
      const doneHandler = (error, message) => {
        const session = currrentSession.find(item => item.id === message.scene + '-' + message.to)

        console.warn('【 IM 】【 getHistoryMsgs 】', new Date(), message)

        if (error) {
          throw new Error(error)
        }
        peace.service.IM.resetInquirySession()
        peace.service.IM.resetInquirySessionMessages()
        peace.service.IM.setInquirySession(session)
        peace.service.IM.setInquirySessionMessages(message.msgs, this.params.familyId)
      }

      // 重置会话未读数
      this.IM.resetSessionUnread(this.params.id)
      // 获取本次问诊历史消息
      this.IM.getHistoryMsgs({
        beginTime: this.params.beginTime,
        scene: this.params.scene,
        to: this.params.to,
        done: doneHandler
      })
    },

    back() {
      this.$router.go(-1)
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
          if (
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.接诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.会诊提示 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.退诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.服务提醒 ||
            message.content.code === Constant.INQUIRY_MESSAGE_TYPE.审核处方通过
          ) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    sendMessageText() {
      if (this.message) {
        if (this.hasSend) {
          return
        }
        this.hasSend = true
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendText 】', new Date(), message)

          this.message = ''

          if (error) {
            throw new Error(error)
          }

          setTimeout(() => {
            this.hasSend = false
          }, 0)
        }

        this.IM.sendText({
          scene: this.params.scene,
          to: this.$store.getters['inquiry/doctorInfo'].doctorId,
          text: this.message,
          done: doneHandler
        })
      } else {
        peace.util.alert('请输入消息内容')
      }
    },

    sendMessageImage(file) {
      if (file) {
        this.loading = true
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendFile 】', new Date(), message)
          this.loading = false
          if (error) {
            throw new Error(error)
          }
        }

        // 压缩 & 发送
        new Compressor(file.file, {
          quality: 0.6,
          convertSize: 50000,
          success: fileBlob => {
            const blob = new File([fileBlob], fileBlob.name, { type: fileBlob.type })

            this.IM.sendFile({
              scene: this.params.scene,
              to: this.$store.getters['inquiry/doctorInfo'].doctorId,
              type: 'image',
              blob: blob,
              done: doneHandler
            })
          }
        })
      }
    },

    showTools() {
      this.tools.visible = true
    },

    hideTools() {
      this.tools.visible = false
      const scrollTop = this.$el.querySelector('.item').scrollTop
      const innerHeight = window.innerHeight

      const interval = setInterval(() => {
        if (innerHeight !== window.innerHeight) {
          window.clearInterval(interval)
          this.$el.querySelector('.item').scrollTop = scrollTop + (innerHeight - window.innerHeight)
        }
      }, 1)
    },

    checkFamilyIsInFlamilyList() {
      peace.service.health.familyLists().then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].id == this.patientInfo.familyId) {
            this.IsInFlamilyList = true
            break
          }
        }
      })
    },

    //会诊列表
    gouserConsultationPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryNo
      })

      this.$router.push(`/components/theConsultation/${params}`)
    },
    //转诊列表
    gouserTranforPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryNo
      })

      this.$router.push(`/components/theTransfer/${params}`)
    },
    //检验单列表
    gouserInspectionPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryNo
      })

      this.$router.push(`/components/theInspection/${params}`)
    },
    //病历
    gouserPrescripCasePage(item) {
      const params = peace.util.encode({
        familyId: item.familyId,
        inquiryNo: item.inquiryNo
      })

      this.$router.push(`/components/theCase/${params}`)
    },
    //处方列表
    gouserPrescripListPage(item) {
      const params = peace.util.encode({
        familyId: item.familyId,
        inquiryNo: item.inquiryNo
      })
      this.$router.push(`/components/theRecipeList/${params}`)
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