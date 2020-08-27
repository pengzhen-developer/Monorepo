<template>
  <!-- 消息时间 -->
  <div v-if="messageComponent">
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
                 :flow="flow"
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
import Constant from '../constant'
import MessageTextContent from './MessageTextContent'
import MessageImageContent from './MessageImageContent'
import MessageSystemContent from './MessageSystemContent'
import MessageCaseCardContent from './MessageCaseCardContent'
import MessageInquiryCardContent from './MessageInquiryCardContent'
import MessageConsultationCardContent from './MessageConsultationCardContent'
import MessageRecipeCardContent from './MessageRecipeCardContent'
import MessageReferralCardContent from './MessageReferralCardContent'
import MessageCheckCardContent from './MessageCheckCardContent'
import MessageVideoContent from './MessageVideoContent'
import MessageFirstOptionCardContent from './MessageFirstOptionCardContent.vue'
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
    MessageCheckCardContent,
    MessageVideoContent
  },
  props: {
    /**消息 */
    message: {
      type: Object,
      required: true
    },
    /**是否显示显示 */
    showTime: {
      type: Boolean,
      required: true,
      default: false
    },
    /**患者信息 */
    patientInfo: {
      type: Object,
      required: true
    },
    /**医生信息 */
    doctorInfo: {
      type: Object,
      required: true
    },
    /**判断家人是否存在于家人列表 */
    IsInFlamilyList: {
      type: Boolean,
      required: false,
      default: true
    },
    /**是否允许点击头像跳转 */
    avatorClick: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    roleInfo() {
      /**患者视角  */
      // const info = {
      //   in: this.doctorInfo,
      //   out: this.patientInfo,
      //   system: {}
      // }
      /**医生端-医生视角  */
      const info = {
        in: this.patientInfo,
        out: this.doctorInfo,

        system: {}
      }
      return info[this.getMessageFlow()]
    },
    flow() {
      return this.getMessageFlow()
    },
    time() {
      return (this.message.time || this.message.sendtime).toDate().formatWXDate()
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
        [Constant.INQUIRY_MESSAGE_TYPE.发起问诊]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.接诊]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.结束问诊]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.转诊提示]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.会诊提示]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.退诊]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.取消问诊]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.服务提醒]: MessageSystemContent,
        [Constant.INQUIRY_MESSAGE_TYPE.病历]: MessageCaseCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.处方]: MessageRecipeCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.问诊卡片]: MessageInquiryCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.会诊单]: MessageConsultationCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.转诊单]: MessageReferralCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.转诊卡片]: MessageReferralCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.首诊卡片]: MessageFirstOptionCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.检查单]: MessageCheckCardContent,
        [Constant.INQUIRY_MESSAGE_TYPE.视频通话]: MessageVideoContent,
        [Constant.INQUIRY_MESSAGE_TYPE.视频异常]: MessageVideoContent
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
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.接诊 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.评价提示 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.会诊提示 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.退诊 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.服务提醒 ||
            this.message.content.code === Constant.INQUIRY_MESSAGE_TYPE.审核处方通过
          ) {
            return 'system'
          }
        }
      }

      return this.message.flow
    },

    onClickAvatar() {
      if (!this.avatorClick) {
        return
      }
      if (this.flow == 'out') {
        this.gotoFamilyPage(this.roleId, this.IsInFlamilyList)
      } else {
        this.gotoDoctorDetail(this.roleId)
      }
    },
    gotoDoctorDetail(roleId) {
      const json = peace.util.encode({
        doctorId: roleId
      })
      $peace.$router.push(`/components/DoctorDetail/${json}`)
    },
    gotoFamilyPage(roleId, flag) {
      let familyId = roleId
      if (flag) {
        peace.cache.set('familyId', familyId)
        $peace.$router.push(`/file/index/`)
      } else {
        $peace.util.alert('该就诊人已从您的家人列表移除，不可查看其健康档案')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
</style>