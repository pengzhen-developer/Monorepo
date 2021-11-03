<!--
 * @Description: IM 聊天消息 - 系统消息
-->

<template>
  <div class="peace-im-message-system flex items-center q-px-md q-py-sm">
    <div class="text-grey-999"
         v-if="messageFlowOut.doctorId"
         v-html="data.content.data.showTextInfo.doctorClientText">
    </div>

    <div class="text-grey-999"
         v-if="messageFlowOut.familyId"
         v-html="data.content.data.showTextInfo.patientClientText">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    messageFlowIn: Object,
    messageFlowOut: Object
  }
}
</script>

<style lang="scss" scoped>
.peace-im-message-system {
  background: #f2f2f2;
  border-radius: 4px;
}
</style>