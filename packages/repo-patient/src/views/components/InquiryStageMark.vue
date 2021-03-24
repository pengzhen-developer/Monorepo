<template>
  <div>
    <div class="stage-list h50px"
         :class="{'isFixed':position==true}"
         :style="{'height':height}">
      <template v-for="(stage,index) in stages">
        <span :key="index"
              :class="{'active':current==stage.key}">{{stage.value}}</span>
        <van-icon :name="require('@src/assets/images/icons/icon-next.jpg')"
                  :key="index"
                  v-if="index!=stages.length-1"></van-icon>
      </template>
    </div>
    <div class="h50px"
         v-if="position==true"
         :style="{'height':height}"></div>
  </div>

</template>
<script>
//资料登记 - 提交咨询 - 医患交流
const STAGE_INQUIRY = [
  { key: 'smartAssistant', value: '资料登记' },
  { key: 'preSaleOrder', value: '提交咨询' },
  { key: 'consultationRoom', value: '医患交流' }
]
//智能预诊-预约复诊-医生问诊-开方购药
const STAGE_RETURNVISITE = [
  { key: 'smartAssistant', value: '智能预诊' },
  { key: 'preSaleOrder', value: '预约复诊' },
  { key: 'consultationRoom', value: '医生问诊' },
  { key: 'prescribeMedicine', value: '开方购药' }
]
export default {
  name: 'InquiryStageMark',
  props: {
    type: String,
    current: String,
    position: Boolean
  },
  watch: {
    type: {
      handler(val) {
        if (val) {
          this.stages = val == 'returnVisit' ? STAGE_RETURNVISITE : STAGE_INQUIRY
        }
      },
      immediate: true
    },
    position: {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.stage-list')
          this.height = element ? element.clientHeight + 'px' : '0px'
        })
      },
      immediate: true
    }
  },
  data() {
    return {
      stages: [],
      height: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.h50px {
  height: 50px;
}
.stage-list {
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  width: 100%;
  &.isFixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }

  span {
    color: #999;
    font-size: 14px;
    line-height: 1;
    &.active {
      color: $primary;
    }
  }
  .van-icon {
    width: 14px;
    height: 14px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>