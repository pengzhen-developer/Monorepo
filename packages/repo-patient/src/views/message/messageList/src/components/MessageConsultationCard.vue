<template>
  <!-- 消息内容 -->
  <div class="message-body message-check"
       @click="onClickDetail()">
    <div class="message-header">
      <van-image width="17px"
                 height="17px"
                 :src="require('../assets/images/ic_hui.png')" /> <span>会诊单</span>
    </div>
    <div class="message-content">
      <div class="item">
        <div class="left other justify">就诊人</div>
        <div class="right other">
          {{ familyName }}
          {{ familySex }}
          {{ familyAge }}
        </div>
      </div>
      <div class="item">
        <div class="left other justify">诊断</div>
        <div class="right other">{{diagnose}}</div>
      </div>
      <div class="item">
        <div class="left other justify">会诊医生</div>
        <div class="right other">
          <div>{{doctorName}} {{doctorDeptName}}</div>
          <div>{{doctorHospitalName}}</div>
        </div>
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
     * 就诊人姓名
     */
    familyName: {
      type: String,
      required: true
    },
    /*
     * 就诊人性别
     */
    familySex: {
      type: String,
      required: true
    },
    /*
     * 就诊人年龄
     */
    familyAge: {
      type: String,
      required: true
    },
    /*
     * 诊断
     */
    diagnose: {
      type: String,
      required: true
    },
    /*
     * 会诊医生名字
     */
    doctorName: {
      type: String,
      required: true
    },
    /*
     * 会诊医生所在医院科室
     */
    doctorDeptName: {
      type: String,
      required: true
    },
    /*
     * 会诊医生所在医院
     */
    doctorHospitalName: {
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

