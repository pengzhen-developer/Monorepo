<template>
  <div class="cancel-order">
    <!-- 取消原因 -->
    <template v-if="info">
      <div class="cancel-model">
        <div class="cancel-msg">
          <div class="cancel-title">{{cancelText}}</div>
          <div class="cancel-reason">{{cancelReasonText}}</div>
        </div>
        <div class="cancel-money">
          <div class="cancel-money-label">退款金额</div>
          <div class="cancel-money-value">￥{{payMoney}}</div>
        </div>
        <!-- 取消订单时间轴 -->
        <div class="van-steps van-steps--horizontal">
          <div class="van-steps__items">
            <div class="van-hairline van-step van-step--horizontal"
                 style="visibility: hidden;">
            </div>
            <div class="van-hairline van-step van-step--horizontal van-step--finish"
                 v-for="(step,index) in info.cancelList"
                 :key="index">
              <div class="van-step__circle-container"
                   :class="{'left':index==0,'right':index==1}"><i class="van-step__circle"></i></div>
              <div class="van-step__line"
                   :class="{'left':index==0,'right':index==1}"></div>
              <div class="van-step__title"
                   :class="{'left':index==0,'right':index==1,'van-step__title--error':step.cancelStatus==3}">{{step.cancelStatusText}}</div>
              <div class="van-step__time"
                   :class="{'left':index==0,'right':index==1}">{{step.createdTime}}</div>
            </div>
            <div class="van-hairline van-step van-step--horizontal van-step--finish"
                 v-if="cancelStatus==1">
              <div class="van-step__circle-container right"><i class="van-step__circle van-step__circle--default"></i></div>
              <div class="van-step__line right"></div>
              <div class="van-step__title right before">取消成功</div>
              <div class="van-step__time right"></div>
            </div>
            <div class="van-hairline van-step van-step--horizontal"
                 style="visibility: hidden;">
            </div>
          </div>
        </div>
        <div class="cancel-tip">商家同意取消订单后，系统将为您返还实付金额，医保/商保支付金额原路返还。</div>
      </div>
      <div class="drug-model">
        <!-- 药店信息 -->
        <div class="drug-store">
          <van-image :src="info.drugStoreLogo"
                     class="logo"></van-image>
          <div class="title">{{info.drugStoreName}}</div>
        </div>
        <!-- 药品信息 -->
        <DrugList v-bind:info="info"
                  v-bind:totalMoney="payMoney"
                  v-bind:showMore="false"
                  v-bind:showInstructions="false"
                  v-bind:onlyWatch="true"></DrugList>

      </div>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'

import DrugList from './components/DrugList'
export default {
  name: 'drugCancelOrder',
  components: { DrugList },
  data() {
    return {
      info: null
    }
  },
  computed: {
    payMoney() {
      return this.formatMoney(this.info.payMoney)
    },
    cancelStatus() {
      return this.info?.cancelList[this.info?.cancelList?.length - 1]?.cancelStatus
    },
    cancelText() {
      //['1'=>'取消申请','2'=>'取消成功','3'=>'取消失败'];
      const cancelStatus = this.info?.cancelList[this.info?.cancelList?.length - 1]?.cancelStatus
      let text = ''
      switch (cancelStatus) {
        case 1:
          text = '取消中'
          break
        case 2:
          text = '取消成功'
          break
        case 3:
          text = '取消失败'
          break
      }
      return text
    },
    cancelReasonText() {
      //['1'=>'取消申请','2'=>'取消成功','3'=>'取消失败'];
      const cancelStatus = this.info?.cancelList[this.info.cancelList.length - 1]?.cancelStatus
      const reason = this.info?.cancelList[this.info.cancelList.length - 1]?.reason
      let text = ''
      switch (cancelStatus) {
        case 1:
          text = `取消原因：${reason}`
          break
        case 2:
          text = `取消订单所付款项将在1-3个工作日内原路退回。`
          break
        case 3:
          text = `失败原因：${reason}`
          break
      }
      return text
    }
  },
  mounted() {},
  activated() {
    this.getDrugOrderDetail()
  },
  methods: {
    formatMoney(n) {
      return n ? (n - 0).toFixed(2) : '0.00'
    },
    getDrugOrderDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.purchasedrug.SelectOrderDetApi(params).then((res) => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel-order {
  background: #fff;
  .cancel-model {
    border-bottom: 8px solid rgba(51, 51, 51, 0.05);
    .cancel-msg {
      height: 104px;
      width: 100%;
      background: #00c6ae;
      padding: 0 16px;
      .cancel-title {
        padding: 22px 0 16px 0;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        word-break: break-all;
      }
      .cancel-reason {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        word-break: break-all;
      }
    }
    .cancel-money {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      margin: 0 16px;
      width: calc(100% - 32px);
      border-bottom: 1px solid rgba(51, 51, 51, 0.05);
      padding: 12px 0 11px 0;
      .cancel-money-value {
        color: #ff3a30;
      }
    }
    .cancel-tip {
      padding: 8px 16px 16px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(58, 58, 58, 0.4);
      line-height: 16px;
    }
  }
  .drug-store {
    width: calc(100% - 16px);
    margin-left: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(51, 51, 51, 0.05);
    > .van-image {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      margin: 8px 8px 8px 0;
    }
    > .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      width: calc(100% - 50px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.van-steps__items {
  .van-step {
    flex: 7;
    &:last-child,
    &:first-child {
      flex: 2;
    }
  }
}
.van-steps--horizontal {
  padding: 20px 10px 0;
}
.van-steps--horizontal .van-steps__items {
  padding-bottom: 0;
  margin: 0;
}
.van-step--horizontal .van-step__circle-container {
  top: 0;
  padding: 0;
  &.left {
    left: 10%;
  }
  &.right {
    left: 60%;
  }
}
.van-step--finish .van-step__circle.van-step__circle--default {
  background-color: rgba(51, 51, 51, 0.1);
}
.van-step--horizontal .van-step__line {
  top: 0;
  &.left {
    left: 10%;
  }
  &.right {
    left: 10%;
    width: 50%;
  }
}
.van-step__circle {
  width: 8px;
  height: 8px;
}
.van-step--horizontal .van-step__title {
  display: block;
  margin-top: 8px;
  text-align: center;
  &.van-step__title--error {
    color: #ff3a30;
  }
  &.before {
    color: rgba(51, 51, 51, 0.6);
  }
  &.left {
    transform: translateX(-41%);
  }
  &.right {
    transform: translateX(12%);
  }
}

.van-step__time {
  display: block;
  color: rgba(51, 51, 51, 0.6);
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
  text-align: center;
  &.left {
    transform: translateX(-39%);
  }
  &.right {
    transform: translateX(8%);
  }
}
</style>