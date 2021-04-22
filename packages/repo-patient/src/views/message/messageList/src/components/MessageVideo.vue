<template>

  <!-- 消息内容 -->
  <div class="message-body">
    <div class="ic_video">
      <img v-if="flow=='in'"
           src="../assets/images/ic_video_left.png" />
      <span class="text-vc">{{ text }}</span>
      <img v-if="flow=='out'"
           src="../assets/images/ic_video_right.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 内容
     */
    text: {
      type: String,
      required: true
    },
    /*
     * in
     * out
     */
    flow: {
      type: String,
      required: true
    }
  }
}
</script>

