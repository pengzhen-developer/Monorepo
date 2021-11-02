<!--
 * @Description: IM 聊天消息 - 图片消息
-->

<template>
  <div class="peace-im-message-image flex items-center q-px-md q-py-sm">
    <el-image style="max-width: 400px; max-height: 600px; "
              title="点击查看大图"
              v-bind:src="data.file.url"
              v-bind:preview-src-list="[data.file.url]"></el-image>
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
.peace-im-message-image {
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