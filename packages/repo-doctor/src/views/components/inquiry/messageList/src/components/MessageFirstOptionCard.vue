<template>
  <!-- 消息内容 -->
  <div class="message-body message-check cursor-pointer"
       @click="onClickDetail()">
    <div class="message-content row">
      <el-image style="width:35px;height:35px;"
                :src="require('../assets/images/ic_firstOption_Order.png')"
                class="q-mr-16"></el-image>
      <div class="column">
        <span class="text-grey-333">首诊卡片</span>
        <span class="text-grey-999"
              style="font-size:12px;">{{ firstInfo.hospitalName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 首诊信息
     *     'familyId'=>'mqbijvrkoq',//家人ID
     *     'hospitalId'=>'23232',//机构ID
     *     'hospitalName'=>'北辰医院',//机构名称
     */
    firstInfo: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClickDetail() {
      // this.$emit('onClickDetail')
    }
  }
}
</script>


<style lang="scss" scoped>
.message-content {
  padding: 23px 14px 17px 14px !important;
}
</style>
