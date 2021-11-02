<!--
 * @Description: IM 聊天消息 - 卡片容器
-->

<template>
  <div class="peace-im-message-card">
    <div v-if="$slots.header"
         class="header flex items-center q-px-10">
      <slot name="header">
      </slot>
    </div>

    <div v-if="$slots.content"
         class="content bg-white q-pa-10">
      <slot name="content"></slot>
    </div>

    <div v-if="$slots.footer"
         class="footer bg-white">

      <div class="q-px-10">
        <div class="message-dashed-line"></div>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.peace-im-message-card {
  width: 280px;
  background: #e7e6e6;
  box-shadow: 0px 1px 20px 0px rgba(163, 131, 131, 0.4);
  border-radius: 6px;
  overflow: hidden;

  .header {
    background-image: url('./../assets/img/bg-img.png');
    background-repeat: no-repeat;
    background-size: 100% 35px;

    height: 35px;
  }

  .message-dashed-line {
    border-bottom: 1px solid #dddddd;
  }
}
</style>