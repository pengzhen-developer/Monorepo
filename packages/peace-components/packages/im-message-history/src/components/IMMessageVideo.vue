<!--
 * @Description: IM 聊天消息 - 视频消息
-->

<template>
  <div class="peace-im-message-text flex items-center q-px-md q-py-sm">
    <div>{{ data.content.data.showTextInfo.doctorClientText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.peace-im-message-text {
  &[flow='in'] {
    background: #f3f3f3;
    color: #333333;
    border-radius: 4px;
  }
  &[flow='out'] {
    background: var(--q-color-primary);
    color: #ffffff;
    border-radius: 4px;
  }
  &[flow='system'] {
    background: #f2f2f2;
    color: #ffffff;
    border-radius: 4px;
  }
}
</style>