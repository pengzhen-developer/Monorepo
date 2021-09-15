<template>
  <!-- 消息内容 -->
  <div class="message-body message-check cursor-pointer"
       @click="onClickDetail()">
    <div class="message-header">
      <el-image style="width:17px;height:17px;"
                :src="require('../assets/images/ic_rp.png')" /> <span>处方</span>
    </div>
    <div class="message-content">
      <div class="item">
        <div class="left other justify">诊断</div>
        <div class="right other">{{diagnosis}}</div>
      </div>
      <div class="item">
        <div class="left other">Rp</div>
        <div class="right other">{{drugInfo}}</div>
      </div>
      <div class="item">
        <div class="left other justify">就诊时间</div>
        <div class="right other">{{visitingTime}}</div>
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
    /*
     * 诊断
     */
    diagnosis: {
      type: String,
      required: true
    },
    /*
     * 药品简介
     */
    drugInfo: {
      type: String,
      required: true
    },
    /*
     * 就诊时间
     */
    visitingTime: {
      type: String,
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

