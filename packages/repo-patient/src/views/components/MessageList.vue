<template>
  <div class="message-list">
    <template v-if="messageList && messageList.length">
      <div @click="hideTools"
           class="item">
        <div :class="getMessageFlow(message)"
             :key="message.time"
             class="message"
             v-for="(message ,index) in messageList">
          <!-- 文本消息 -->
          <template v-if="getMessageType(message) === 'text' || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 || 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊|| 
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒">
            <!-- 消息时间 -->
            <template
                      v-if="isShowMessageTime(message ,index) || showTimeDic[getMessageType(message)]">
              <div class="message time">
                <div class="message-body">
                  <span>{{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</span>
                </div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div class="message-body">
                <div v-html="getMessageText(message)"></div>
              </div>

              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>
            </div>
          </template>

          <!-- 问诊卡片 -->
          <template
                    v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.问诊卡片">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div class="message-body message-card">
                <div class="message-header">
                  <van-image width="20px"
                             height="17px"
                             :src="require('@src/assets/images/ic_message.png')" />
                  <span>
                    {{ message.content.data.patientInfo.familyName }} |
                    {{ message.content.data.patientInfo.familySex }} |
                    {{ message.content.data.patientInfo.familyAge }}岁
                  </span>
                  <img v-if="message.content.data.inquiryOrderInfo.isAgain"
                       src="../../assets/images/ic_fz.png"
                       class="fz" />
                </div>
                <div class="message-content">
                  <div class="t">病情描述</div>
                  <div class="content">{{ message.content.data.inquiryOrderInfo.describe }}</div>
                </div>
                <div class="message-line"></div>
                <div class="message-footer"
                     @click="goInquiryOrderInfo(message)">
                  <van-image width="16px"
                             height="18px"
                             :src="require('@src/assets/images/ic_ck.png')" />
                  查看订单
                </div>
              </div>

              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>
            </div>
          </template>

          <!-- 检查单 -->
          <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.检查单">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div class="message-body message-check">
                <div class="message-header">
                  <van-image width="17px"
                             height="17px"
                             :src="require('@src/assets/images/ic_check.png')" /> <span>检查单</span>
                </div>
                <div class="message-content">
                  <div class="item"
                       v-for="item in message.content.data.checkOrderInfo.checkOrderTxt"
                       :key="item.itemId">
                    <div class="left">{{ item.name }}</div>
                    <div class="right">x 1</div>
                  </div>
                  <div class="message-line-solid"></div>
                </div>
                <div class="message-footer"
                     @click="goInquiryCheckInfo(message)">
                  查看详情
                </div>
              </div>

              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>

            </div>
          </template>

          <!-- 转诊单 -->
          <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊单">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div @click="getTransfelDetail(message)"
                   class="message-body case">
                <img src="~@src/assets/images/pic_medication recommendations.png" />
                <div style="text-align: left;">
                  <p style="font-size: 14px;">转诊单</p>
                  <p>查看详情</p>
                </div>
              </div>

              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>

            </div>
          </template>

          <!-- 会诊单 -->
          <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊单">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div @click="getTransfelDetail(message)"
                   class="message-body case">
                <img src="~@src/assets/images/pic_medication recommendations.png" />
                <div style="text-align: left;">
                  <p style="font-size: 14px;">会诊单</p>
                  <p>查看详情</p>
                </div>
              </div>

              <!-- 消息头像 -->
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>

            </div>
          </template>

          <!-- 视频消息 -->
          <template
                    v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频通话">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <!-- 消息内容 -->
            <div class="message-body">
              <span>{{ getMessageText(message) }}</span>
            </div>
          </template>

          <!-- 图片消息 -->
          <template v-else-if="getMessageType(message) === 'image'">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div>
                <img :src="message.file.url"
                     @click="viewImage(message.file.url)"
                     style="max-width: 200px; " />
              </div>

              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>
            </div>
          </template>

          <!-- 病历消息 -->
          <template
                    v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div @click="getCaseDetail(message)"
                   class="message-body case">
                <img src="~@src/assets/images/pic_medication recommendations.png" />
                <div style="text-align: left;">
                  <p style="font-size: 14px;">病历</p>
                  <p>查看详情</p>
                </div>
              </div>

              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>
            </div>
          </template>

          <!-- 处方消息 -->
          <template
                    v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方">
            <!-- 消息时间 -->
            <template v-if="isShowMessageTime(message ,index)">
              <div class="message time">
                <div class="message-body">
                  {{ (message.time || message.sendtime).toDate().calcTimeHeader() }}</div>
              </div>
            </template>

            <div :style="{ 'justify-content' : getMessageFlow(message) === 'in' ? 'flex-start' : getMessageFlow(message) === 'out' ? 'flex-end' : 'center' }"
                 style="display: flex; align-items: center;">
              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'in'">
                <img
                     :src="(internalDoctorInfo && internalDoctorInfo.doctorAvatar) || $store.getters['inquiry/doctorInfo'].doctorAvatar" />
              </div>

              <!-- 消息内容 -->
              <div @click="getRecipeDetail(message)"
                   class="message-body recipe">
                <img src="~@src/assets/images/pic_medication recommendations.png" />
                <div style="text-align: left;">
                  <p style="font-size: 14px;">处方</p>
                  <p>查看详情</p>
                </div>
              </div>

              <div class="message-avatar"
                   v-if="getMessageFlow(message) === 'out'">
                <img class="img-avatar"
                     mode="cover"
                     src="~@/assets/images/ic_head portrait.png" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="input"
           v-if="canShowInput">
        <van-field :autosize="{ maxHeight: 60, minHeight: 20 }"
                   @focus="hideTools"
                   rows="1"
                   type="textarea"
                   v-model.trim="message"
                   v-on:keyup.enter.stop="sendMessageText">
          <van-icon @click="showTools"
                    name="add-o"
                    slot="right-icon" />
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

    <peace-dialog :visible.sync="caseDetail.visible">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>
    <peace-dialog :visible.sync="recipeDetail.visible">
      <TheRecipe :data="recipeDetail.data"></TheRecipe>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)

import TheCase from '@src/views/components/TheCase'
import TheRecipe from '@src/views/components/TheRecipe'

export default {
  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    },

    doctorInfo: {
      type: Object,
      default() {
        return {}
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
    TheCase,
    TheRecipe
  },

  data() {
    return {
      internalData: undefined,
      internalDoctorInfo: undefined,

      message: '',

      tools: {
        visible: false
      },

      caseDetail: {
        visible: false,
        data: {}
      },

      recipeDetail: {
        visible: false,
        data: {}
      },
      showTimeDic: {
        710: true, // 接诊
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

  watch: {
    '$store.state.inquiry.sessionMessages': {
      handler() {
        this.$nextTick(function() {
          const element = document.querySelector('.message-list .item')

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
    },

    doctorInfo: {
      handler() {
        this.internalDoctorInfo = this.data
      },
      immediate: true
    }
  },

  computed: {
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
          //   message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示 ||
          //   message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 ||
          //   message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示
          // )
          //   return false
        }

        return true
      })
      return sessionMessages
    },

    canShowInput() {
      if (
        this.$store.getters['inquiry/inquiryInfo'].inquiryStatus ===
          peace.type.INQUIRY.INQUIRY_STATUS.待接诊 ||
        this.$store.getters['inquiry/inquiryInfo'].inquiryStatus ===
          peace.type.INQUIRY.INQUIRY_STATUS.问诊中
      ) {
        return true
      } else {
        return false
      }
    }
  },

  created() {
    if (!this.data) {
      const params = peace.util.decode(this.$route.params.json)

      // 传递 inquiryNo 获取聊天记录
      if (params.inquiryNo) {
        this.getHistoryMsgsByDB()
      }
      // 传递 session 获取聊天记录
      else {
        setTimeout(() => {
          this.getHistoryMsgsByIM()
        }, 1000)
      }
    }
  },

  destroyed() {
    // 清除当前聊天 session
    peace.service.IM.resetInquirySession()
    // 清除聊天记录
    peace.service.IM.resetInquirySessionMessages()
  },

  methods: {
    getHistoryMsgsByDB() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.patient.chatDetail(params).then(res => {
        const historyMessageFormatHandler = messages => {
          if (messages && Array.isArray(messages)) {
            messages.forEach(message => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow =
                $peace.$store.state.user.userInfo.patientInfo.id === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.msgList)

        this.internalData = res.data.msgList
        this.internalDoctorInfo = res.data.doctorInfo
      })
    },
    getHistoryMsgsByIM() {
      const params = peace.util.decode(this.$route.params.json)

      const doneHandler = (error, message) => {
        const session = this.$store.state.inquiry.sessions.find(
          item => item.id === message.scene + '-' + message.to
        )

        console.warn('【 IM 】【 getHistoryMsgs 】', new Date(), message)

        if (error) {
          throw new Error(error)
        }

        peace.service.IM.resetInquirySession()
        peace.service.IM.resetInquirySessionMessages()
        peace.service.IM.setInquirySession(session)
        peace.service.IM.setInquirySessionMessages(message.msgs)
      }

      // 重置会话未读数
      $peace.NIM.resetSessionUnread(params.id)
      // 获取本次问诊历史消息
      $peace.NIM.getHistoryMsgs({
        beginTime: params.beginTime,
        scene: params.scene,
        to: params.to,
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
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒
          ) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    getMessageText(message) {
      if (message.content && message.content.data && message.content.data.showTextInfo) {
        return message.content.data.showTextInfo.patientClientText
      }

      if (message.text) {
        return message.text
      }
    },

    sendMessageText() {
      if (this.message) {
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendText 】', new Date(), message)

          this.message = ''

          if (error) {
            throw new Error(error)
          }
        }

        $peace.NIM.sendText({
          scene: this.$store.state.inquiry.session.scene,
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
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendFile 】', new Date(), message)

          if (error) {
            throw new Error(error)
          }
        }

        $peace.NIM.sendFile({
          scene: this.$store.state.inquiry.session.scene,
          to: this.$store.getters['inquiry/doctorInfo'].doctorId,
          type: 'image',
          blob: file.file,
          done: doneHandler
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

    goInquiryOrderInfo() {
      peace.util.alert('需要跳转问诊卡详情')
    },

    goInquiryCheckInfo() {
      peace.util.alert('需要跳转检查单详情')
    },

    getTransfelDetail() {
      peace.util.alert('需要跳转检查单详情')
    },

    getCaseDetail(message) {
      const params = peace.util.encode({
        inquiryNo: message.content.data.inquiryInfo.inquiryNo,
        inquiryId: message.content.data.inquiryInfo.inquiryId
      })

      this.$router.push(`/components/theCase/${params}`)
    },

    getRecipeDetail(message) {
      const params = peace.util.encode({
        prescribeId: message.content.data.recipeInfo.recipeId
      })

      this.$router.push(`/components/theRecipe/${params}`)
    },

    viewImage(path) {
      ImagePreview([path])
    }
  }
}
</script>

<style lang="scss" scoped>
.message-check {
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:first-child {
      padding-top: 5px;
    }
    &:last-child {
      padding-bottom: 5px;
    }
    .left {
      width: 80%;
      text-align: left;
    }
    .right {
      color: #999;
    }
  }
  .message-line-solid {
    border-top: 1px solid #eee;
  }
  .message-content {
    padding-top: 0;
    padding-bottom: 0;
  }
  .message-footer {
    color: #999;
    justify-content: center;
    &::after {
      height: 0;
    }
  }
}
.message-card,
.message-check {
  width: 70%;
  background-color: #fff !important;
  padding: 0 !important;
  box-sizing: border-box;
}
.message-header {
  background-image: url('../../assets/images/bg-img.png');
  background-size: cover;
  display: flex;
  align-items: center;
  height: 35px;
  width: 100%;
  color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
  position: relative;
  span {
    margin-left: 10px;
  }
  .fz {
    width: 50px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }
}
.message-content {
  text-align: left;
  padding: 10px;
  .t {
    color: #999;
  }
  .content {
    color: #333;
  }
}
.message-line {
  width: 100%;
  height: 1px;
  border-top: 1px dashed #eee;
  position: relative;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    left: -7px;
    top: -7px;
    position: absolute;
    display: block;
    background: #f9f9f9;
  }
  &::after {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    right: -7px;
    top: -7px;
    position: absolute;
    display: block;
    background: #f9f9f9;
  }
}
.message-footer {
  position: relative;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #333;
  .van-image {
    margin: 0 10px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 12px;
    background-image: url('../../assets/images/icons/arrow-right.jpg');
    background-size: cover;
  }
}
.message-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  .item {
    overflow: auto;
    padding: 5px 10px;
    flex: 1;

    .message {
      font-size: 14px;
      margin: 0 0 10px 0;

      &.in {
        text-align: left;

        .message-body {
          color: rgba(51, 51, 51, 1);
          background: rgba(243, 243, 243, 1);
        }

        .message-avatar {
          margin: 0 10px 0 0;
          align-self: flex-start;
          img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
          }
        }
      }

      &.out {
        /*text-align: right;*/

        .message-body {
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 198, 174, 1);
        }

        .message-avatar {
          margin: 0 0 0 10px;
          align-self: flex-start;
          img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
          }
        }
      }

      &.system {
        font-size: 12px;
        text-align: center;
        margin: 10px auto;

        .message-body {
          color: rgba(155, 155, 155, 1);
          background: rgba(242, 242, 242, 1);
        }
      }

      &.time {
        text-align: center;
        margin: 0;

        .message-body {
          margin: 0;
          font-size: 12px;
          color: rgba(155, 155, 155, 1);
          background: transparent;

          * {
            font-size: 12px;
          }
        }
      }

      .message-body {
        white-space: pre-wrap;
        word-wrap: break-word;
        display: inline-block;
        padding: 5px 5px;
        border-radius: 6px;
        max-width: 80%;

        &.case,
        &.recipe {
          background: #fff;
          border: 1px solid #f2f2f2;
          padding: 10px;
          cursor: pointer;
          display: inline-flex;

          img {
            width: 50px;
            height: 44px;
          }

          p {
            margin: 0 0 2px 5px;
            color: #333333;
          }
        }
      }
    }
  }

  .input {
    min-height: 50px;
    position: relative;
    bottom: 0;
    left: 0;
    z-index: 1;
    border-top: 1px solid #f5f5f5;

    .input-tools {
      padding: 20px;

      .flex-center {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          margin: 5px 0 0 0;
        }
      }
    }
  }
}
</style>

