<template>
  <!-- 消息内容 -->
  <div class="message-body message-check"
       @click="onClickDetail()">
    <div class="message-header">
      <el-image style="width:17px;height:17px;"
                :src="require('../assets/images/ic_check.png')" /> <span>检验挂号单</span>
    </div>
    <div class="message-content">
      <div class="item"
           v-for="item in inspectRegisterOrder"
           :key="item.comboNo">
        <div class="left elps">{{ item.comboName }}</div>
        <div class="right"></div>
      </div>
      <div class="message-line-solid"></div>
    </div>
    <div class="message-footer">
      查看详情
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inspectRegisterOrder: {
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

