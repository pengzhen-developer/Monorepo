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
          <div class="cancel-money-label"
               @click="showMessage">退款金额 <van-image v-bind:src="require('@src/assets/images/ic_wenhao.png')"></van-image>
          </div>
          <div class="cancel-money-value">
            <!-- ￥{{payMoney}} -->
            <peace-price v-bind:price="payMoney"
                         v-bind:size="16"
                         v-bind:transformOrigin="'right'"></peace-price>
          </div>
        </div>
        <!-- 取消订单时间轴 -->
        <div class="van-steps van-steps--horizontal"
             v-if="info&&info.cancelList&&info.cancelList.length>0">
          <div class="van-steps__items"
               v-if="info.cancelList.length>2">
            <div class="van-hairline van-step van-step--horizontal"
                 style="visibility: hidden;">
            </div>
            <div class="van-hairline van-step van-step--horizontal van-step--finish"
                 v-for="(step,index) in info.cancelList"
                 :key="index">
              <div class="van-step__circle-container"
                   :class="{'start':index==0,'end':index==info.cancelList.length-1}"><i class="van-step__circle"></i></div>
              <div class="van-step__line"
                   :class="{'start':index==0,'end':index==info.cancelList.length-1}"></div>
              <div class="van-step__title"
                   :class="{'start':index==0,'end':index==info.cancelList.length-1,'van-step__title--error':step.cancelStatus==3}">{{step.cancelStatusText}}</div>
              <div class="van-step__time"
                   :class="{'start':index==0,'end':index==info.cancelList.length-1}">{{step.createdTime}}</div>
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
          <div class="steps-list"
               v-else>
            <div class="steps-item steps-item__start">
              <div class="steps-item__circle"></div>
              <div class="steps-item__line "></div>
              <div class="steps-item__text ">{{info.cancelList[0].cancelStatusText}}</div>
              <div class="steps-item__time ">{{info.cancelList[0].createdTime}}</div>
            </div>
            <div class="steps-item">
              <div class="steps-item__circle"></div>
              <div class="steps-item__line "></div>
              <div class="steps-item__text "></div>
              <div class="steps-item__time "></div>
            </div>
            <div class="steps-item steps-item__end before"
                 v-if="cancelStatus==1">
              <div class="steps-item__circle "></div>
              <div class="steps-item__line "></div>
              <div class="steps-item__text ">取消成功</div>
              <div class="steps-item__time ">2020-04-27 15:58:33</div>
            </div>
            <div class="steps-item steps-item__end"
                 :class="{'error':info.cancelList[info.cancelList.length-1].cancelStatus==3}"
                 v-else>
              <div class="steps-item__circle "></div>
              <div class="steps-item__line "></div>
              <div class="steps-item__text ">{{info.cancelList[info.cancelList.length-1].cancelStatusText}}</div>
              <div class="steps-item__time ">{{info.cancelList[info.cancelList.length-1].createdTime}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="cancel-tip">商家同意取消订单后，系统将为您返还实付金额，医保/商保支付金额原路返还。</div> -->
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

import { Dialog } from 'vant'
export default {
  name: 'drugCancelOrder',
  components: {
    DrugList,
    [Dialog.Component.name]: Dialog.Component
  },
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
    showMessage() {
      Dialog.confirm({
        title: '退款金额说明',
        message: '商家同意取消订单后，系统将为您退回实付金额，医保/商保支付金额原路返还。',
        showCancelButton: false,
        confirmButtonText: '我知道了',
        className: 'money-dialog'
      })
    },
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
<style lang="scss">
.money-dialog {
  /deep/.van-dialog__header {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 28px;
  }
  /deep/.van-dialog__message {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
  /deep/.van-button__text {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 25px;
  }
}
</style>
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
      .cancel-money-label {
        display: flex;
        align-items: center;
        .van-image {
          width: 12px;
          height: 12px;
          margin-left: 4px;
        }
      }
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
    flex: 1;
    &:last-child,
    &:first-child {
      flex: 0;
    }
  }
}
.van-steps--horizontal {
  padding: 20px 16px 10px;
}
.van-steps--horizontal .van-steps__items {
  padding-bottom: 0;
  margin: 0;
}
.van-step--horizontal .van-step__circle-container {
  top: 0;
  padding: 0;
  transform: translate(-50%, -50%);
  left: 50%;
}
.van-step--finish .van-step__circle.van-step__circle--default {
  background-color: rgba(51, 51, 51, 0.1);
}
.van-step--horizontal .van-step__line {
  top: 0;
  &.start {
    left: 50%;
  }
  &.end {
    left: 0%;
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
  margin-left: 0;
  text-align: center;
  transform: translateX(0%);
  &.van-step__title--error {
    color: #ff3a30;
  }
  &.before {
    color: rgba(51, 51, 51, 0.6);
  }
}

.van-step__time {
  display: block;
  color: rgba(51, 51, 51, 0.6);
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
  text-align: center;
  white-space: nowrap;
}

.steps-list {
  display: flex;
  .steps-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    .steps-item__circle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: transparent;
      border-radius: 4px;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
    }
    .steps-item__line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 2;
      height: 1px;
      background: #00c6ae;
    }
    .steps-item__text {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-top: 12px;
      margin-bottom: 2px;
    }
    .steps-item__time {
      font-size: 12px;
      color: rgba(51, 51, 51, 0.6);
      line-height: 16px;
      white-space: nowrap;
    }
    flex: 1;
    &:last-child {
      flex: none;
      min-width: 60px;
      &.before {
        .steps-item__circle {
          background: #eaeaea;
        }
        .steps-item__text {
          color: rgba(51, 51, 51, 0.6);
        }
        .steps-item__time {
          color: transparent;
        }
      }
      &.error {
        .steps-item__text {
          color: #ff3a30;
        }
      }
      .steps-item__circle {
        background: #00c6ae;
      }
      .steps-item__line {
        right: 50%;
        width: 50%;
      }
    }
    &:first-child {
      flex: none;
      min-width: 60px;
      .steps-item__circle {
        background: #00c6ae;
      }
      .steps-item__line {
        left: 50%;
        width: 50%;
      }
    }
  }
}
</style>