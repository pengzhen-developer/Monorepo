<template>
  <!-- 消息内容 -->
  <div class="message-body message-check" @click="onClickDetail()">
    <div class="message-header"><el-image style="width:17px;height:17px;" :src="require('../assets/images/ic_check.png')" /> <span>检验单</span></div>
    <div class="message-content q-mb-10">
      <div class="item" v-for="item in checkOrderTxt" :key="item.comboNo">
        <div class="left elps">{{ item.comboName }}</div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 诊断
     */
    checkOrderTxt: {
      type: Array,
      required: true
    }
  },

  methods: {
    onClickDetail() {
      this.$emit('onClickDetail')
    }
  }
}
</script>
