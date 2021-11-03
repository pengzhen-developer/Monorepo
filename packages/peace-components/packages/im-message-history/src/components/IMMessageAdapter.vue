<!--
 * @Description: 消息适配器
-->

<template>
  <div v-if="IMMessageComponentAdapter"
       class="peace-im-message-container q-mb-md">
    <div class="message-time flex justify-center q-mb-xs text-grey-999"
         v-if="shouldVisibleTime">
      {{ Peace.util.formatWXDate(data.time) }}
    </div>

    <div class="message-content flex row no-wrap"
         v-bind:class="{ 
                         'reverse': data.flow === 'out', 
                         'justify-center': data.flow === 'system' 
                       }">
      <div class="message-avadar flex full-height items-start"
           v-if="shouldVisibleAvatar"
           v-bind:class="{ 
                           'q-mr-10': data.flow === 'in', 
                           'q-ml-10': data.flow === 'out' 
                         }">
        <template v-if="data.flow === 'in'">
          <template v-if="messageFlowIn.familyId">
            <el-avatar class="bg-primary"
                       v-bind:size="36">{{ messageFlowIn.familyName.substring(messageFlowIn.familyName.length - 2) }}</el-avatar>
          </template>
          <template v-if="messageFlowIn.doctorId">
            <el-avatar class="bg-primary"
                       v-bind:size="36"
                       v-bind:src="messageFlowIn.doctorAvatar"></el-avatar>
          </template>
        </template>
        <template v-if="data.flow === 'out'">
          <template v-if="messageFlowOut.familyId">
            <el-avatar v-bind:size="36">{{ messageFlowOut.familyName.substring(messageFlowOut.familyName.length - 2) }}</el-avatar>
          </template>
          <template v-if="messageFlowOut.doctorId">
            <el-avatar v-bind:size="36"
                       v-bind:src="messageFlowOut.doctorAvatar"></el-avatar>
          </template>
        </template>
      </div>

      <div class="message-body">
        <component v-on="$listeners"
                   v-bind="$attrs"
                   v-bind:is="IMMessageComponentAdapter"
                   v-bind:flow="data.flow"
                   v-bind:data="data"
                   v-bind:messageFlowIn="messageFlowIn"
                   v-bind:messageFlowOut="messageFlowOut">
          <template v-slot:prescription-operation="{ data, refetch, close }">
            <slot name="prescription-operation"
                  v-bind:data="data"
                  v-bind:refetch="refetch"
                  v-bind:close="close">
            </slot>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import IMMessageSystem from './IMMessageSystem.vue'
import IMMessageText from './IMMessageText.vue'
import IMMessageVoice from './IMMessageVoice.vue'
import IMMessageVideo from './IMMessageVideo.vue'
import IMMessageImage from './IMMessageImage.vue'
import IMMessageCase from './IMMessageCase.vue'
import IMMessagePrescription from './IMMessagePrescription.vue'
import IMMessageInquiry from './IMMessageInquiry.vue'
import IMMessageInitialVisit from './IMMessageInitialVisit.vue'
import IMMessageInspect from './IMMessageInspect.vue'
import IMMessageInspectRegister from './IMMessageInspectRegister.vue'

export default {
  components: {
    IMMessageText,
    IMMessageImage,
    IMMessageVideo,
    IMMessageVoice,
    IMMessageSystem,
    IMMessageCase,
    IMMessagePrescription,
    IMMessageInquiry,
    IMMessageInitialVisit,
    IMMessageInspect,
    IMMessageInspectRegister
  },

  props: {
    data: Object,
    messageFlowIn: Object,
    messageFlowOut: Object,
    shouldVisibleTime: Boolean
  },

  data() {
    return {}
  },

  computed: {
    /**
     * @description: 消息组件适配器
     * @param {*}
     * @return {*}
     */
    IMMessageComponentAdapter() {
      /** 消息类型 */
      const IMMessageType = this.data.type === 'custom' ? this.data.content.code : this.data.type
      /** 消息适配器字典 */
      const IM_MESSAGE_COMPONENT_ADAPTER = {
        /** 文本消息－－ */ ['text']: IMMessageText,
        /** 图片消息－－ */ ['image']: IMMessageImage,
        /** 语音消息－－ */ ['audio']: IMMessageVoice,
        /** 接诊－－－－ */ ['710']: IMMessageSystem,
        /** 病历－－－－ */ ['720']: IMMessageCase,
        /** 处方－－－－ */ ['730']: IMMessagePrescription,
        /** 结束问诊－－ */ ['740']: IMMessageSystem,
        /** 转诊提示－－ */ ['742']: IMMessageSystem,
        /** 退诊－－－－ */ ['750']: IMMessageSystem,
        /** 取消问诊－－ */ ['760']: IMMessageSystem,
        /** 视频通话正常 */ ['770']: IMMessageVideo,
        /** 视频通话异常 */ ['771']: IMMessageVideo,
        /** 问诊单－－－ */ ['794']: IMMessageInquiry,
        /** 首诊单－－－ */ ['796']: IMMessageInitialVisit,
        /** 检验挂号单－ */ ['797']: IMMessageInspectRegister,
        /** 检验单－－－ */ ['798']: IMMessageInspect
      }

      return IM_MESSAGE_COMPONENT_ADAPTER[IMMessageType]
    },

    /**
     * @description: 是否应该显示头像
     * @param {*}
     * @return {*}
     */
    shouldVisibleAvatar() {
      return ['in', 'out'].includes(this.data.flow)
    }
  }
}
</script>

<style lang="scss" scoped>
.peace-im-message-container {
  .message-body {
    max-width: 60%;
  }

  ::v-deep .el-avatar > img {
    height: 100%;
    width: 100%;
  }
}
</style>