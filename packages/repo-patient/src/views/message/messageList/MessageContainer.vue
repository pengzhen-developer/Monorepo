<template>
  <!-- 消息时间 -->
  <div>
    <template v-if="showTime">
      <div class="message time">
        <div class="message-body">
          <slot :name="time">
            <span>{{ time }}</span>
          </slot>
        </div>
      </div>
    </template>

    <div :style="{ 'justify-content' : flow === 'in' ? 'flex-start' : flow === 'out' ? 'flex-end' : 'center' }"
         style="display: flex; align-items: center;">
      <div class="message-avatar"
           @click="onClickAvatar()"
           v-if="flow === 'in'">
        <img v-if="roleAvatar"
             :src="roleAvatar" />
        <div class="img-name"
             v-else>{{roleName}}</div>
      </div>

      <!-- 消息内容 -->
      <component :style="{ 'text-align' : flow === 'in' ? 'left' : flow === 'out' ? 'right' : 'center' }"
                 style="width:73%;"
                 :is="messageComponent"
                 :message="message"
                 :type="type"></component>

      <div class="message-avatar"
           @click="onClickAvatar()"
           v-if="flow === 'out'">
        <img v-if="roleAvatar"
             :src="roleAvatar" />
        <div class="img-name"
             v-else>{{roleName}}</div>

      </div>
    </div>
  </div>

</template>

<script>
import peace from '@src/library'
import { onClickAvatar } from './common'

import MessageTextContent from './MessageTextContent'
import MessageImageContent from './MessageImageContent'
import MessageSystemContent from './MessageSystemContent'
import MessageCaseCardContent from './MessageCaseCardContent'
import MessageInquiryCardContent from './MessageInquiryCardContent'
import MessageConsultationCardContent from './MessageConsultationCardContent'
import MessageRecipeCardContent from './MessageRecipeCardContent'
import MessageReferralCardContent from './MessageReferralCardContent'
import MessageCheckCardContent from './MessageCheckCardContent'
export default {
  components: {
    MessageTextContent,
    MessageImageContent,
    MessageSystemContent,
    MessageCaseCardContent,
    MessageInquiryCardContent,
    MessageConsultationCardContent,
    MessageRecipeCardContent,
    MessageReferralCardContent,
    MessageCheckCardContent
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    showTime: {
      type: Boolean,
      required: true,
      default: false
    },
    patientInfo: {
      type: Object,
      required: true
    },
    doctorInfo: {
      type: Object,
      required: true
    },
    IsInFlamilyList: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    roleInfo() {
      const info = {
        in: this.doctorInfo,
        out: this.patientInfo,
        system: {}
      }
      return info[this.getMessageFlow()]
    },
    flow() {
      return this.getMessageFlow()
    },
    time() {
      return (this.message.time || this.message.sendtime).toDate().calcTimeHeader()
    },
    messageComponent() {
      // 根据业务定义
      // 当消息类型为 custom 时，需要从 message.content.code 拿到真实的消息类型
      const messageType = this.message.type === 'custom' ? this.message.content.code : this.message.type

      // 根据消息类型，适配 UI Component
      return this.componentAdapter(messageType)
    },
    type() {
      return this.message.type === 'custom' ? this.message.content.code : this.message.type
    },
    roleAvatar() {
      return this.roleInfo.avartor || this.roleInfo.doctorAvatar || ''
    },
    roleName() {
      let roleName = this.roleInfo.doctorName || this.roleInfo.familyName || ''
      return roleName.substring(roleName.length - 2)
    },
    roleId() {
      return this.roleInfo.doctorId || this.roleInfo.familyId || ''
    }
  },

  methods: {
    /**
     * 消息组件适配器
     */
    componentAdapter(messageType = '') {
      const messageTypeComponents = {
        ['text']: MessageTextContent,
        ['image']: MessageImageContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.审核处方通过]: MessageSystemContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历]: MessageCaseCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方]: MessageRecipeCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.问诊卡片]: MessageInquiryCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊单]: MessageConsultationCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊单]: MessageReferralCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊卡片]: MessageReferralCardContent,
        [peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.检查单]: MessageCheckCardContent
      }

      return messageTypeComponents[messageType]
    },
    getMessageFlow() {
      // out
      // in
      // system
      if (this.message.type === 'custom') {
        if (this.message.content && this.message.content.code) {
          if (
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒 ||
            this.message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.审核处方通过
          ) {
            return 'system'
          }
        }
      }

      return this.message.flow
    },
    onClickAvatar() {
      onClickAvatar(this.flow, this.roleId, this.IsInFlamilyList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@src/views/message/messageList/style.scss';
</style>