<template>
  <div class="shadow"
       v-show="show"
       @click="changeFlag">
    <div class="dialog">
      <img :src="require('@src/assets/images/ic_cha.png')"
           @click="changeFlag">
      <div class="dialog-title">{{internalData.title}}</div>
      <div class="dialog-content">
        <template v-if="internalData.list&&internalData.list.length>0">
          <span v-for="(item,index) in internalData.list"
                :key="index">{{item}}</span>
        </template>
        <template v-else>
          {{internalData.content}}
        </template>
      </div>
      <div class="dialog-message"
           v-if="internalData.message"
           v-html="internalData.message"></div>
      <van-button round
                  size="large"
                  type="primary"
                  @click.stop="onSucces">{{internalData.btn}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserServiceNotice',
  model: {
    prop: 'show',
    event: 'changeFlag'
  },
  props: {
    show: Boolean,

    info: Object
  },
  data() {
    return {
      internalData: {},
      consult: {
        title: '温馨提示',
        list: [],
        content: '医生基于患者自述病情所发表的言论，仅作为健康咨询类建议，不能作为诊断、治疗、处方等诊疗性依据。若是急、重症患者，请务必及时前往医院就诊。',
        message: '咨询时间：<br>8:00 - 17:00请在对应时间段内咨询',
        btn: '确认'
      },
      subsequent: {
        title: '用户服务须知',
        list: [
          '急重症问题请您线下进行就医，以免耽误病情。',
          '全额预缴诊疗费用，医生接诊时进行结算，就诊日医生未接诊将全额退款。',
          '医生对复诊患者可开具检査检验，给出进一步诊疗建议，符合条件的患者可开具处方。',
          '医生给出结论后手动结束复诊。',
          '药品配送到家，因药品为特殊商品，经发出不得退换。'
        ],
        content: '',
        message: '',
        btn: '同意'
      }
    }
  },
  watch: {
    info: {
      handler(val) {
        if (val) {
          const msg = val.type == 'returnVisit' ? this.subsequent : this.consult
          this.internalData = Object.assign({}, this.internalData, msg, val)
        }
      },
      immediate: true
    }
  },

  methods: {
    changeFlag() {
      this.$emit('changeFlag', false)
    },
    onSucces() {
      this.$emit('onSucces')
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
.dialog {
  position: fixed;
  background: rgb(255, 255, 255);
  width: calc(100% - 55px);
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  z-index: 1000;
  border-radius: 7px;
  padding: 25px 24px;
  color: #333;
  img {
    position: absolute;
    padding: 12px;
    right: 0;
    top: 0;
    z-index: 1001;
    width: 43px;
    height: 43px;
    display: block;
  }
  .dialog-title {
    height: 25px;
    font-size: 18px;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .dialog-content {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
    margin-top: 8px;
    margin-bottom: 20px;
    span {
      display: block;
      padding-left: 12px;
      position: relative;
      &::before {
        content: ' ';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #333;
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
  }
  .dialog-message {
    margin-bottom: 20px;
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;
    color: rgba(51, 51, 51, 1);
    padding: 12px 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 15px;
    line-height: 21px;
  }
  .van-button {
    height: 45px;
    line-height: 45px;
  }
}
</style>