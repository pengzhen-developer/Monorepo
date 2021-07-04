<template>
  <div class="service"
       v-if="info">
    <!-- 医生信息 -->
    <div class="service-item flex">
      <van-image v-bind:src="info.photoDoc"
                 class="doctor-logo"></van-image>
      <div class="doctor-info">
        <div class="doctor-name"><span>{{info.doctorName}}</span><span>{{info.doctorTitle}}</span><span>{{info.netdeptChild}}</span></div>
        <div class="doctor-hosp">{{info.hospitalName}}</div>
      </div>
    </div>

    <!-- 服务包 -->
    <div class="service-item">
      <div class="title"
           style="marginBottom:12px;">服务包</div>
      <div class="subTitle"><span>名称：</span>{{info.servicePackageName}}</div>
      <div class="service-line"></div>
      <div class="title"
           style="marginBottom:16px;">服务内容</div>
      <div class="equity">
        <div class="equity-item header">
          <div class="equity-item-label">服务内容</div>
          <div class="equity-item-value">次数</div>
        </div>
        <div class="equity-item"
             v-for="(equity,index) in info.servicePackageEquities"
             v-bind:key="index">
          <div class="equity-item-label">{{equity.equitiesName}}</div>
          <div class="equity-item-value">{{equity.num}}次 </div>
        </div>
      </div>
      <div class="equity-tip">服务有效期：<span>{{info.effectiveDays}}天</span><span>（订单支付成功开始计算）</span></div>

    </div>

    <!-- 费用明细 -->
    <div class="service-item">
      <div class="service-item-content between totalMoney">
        <div class="service-item-content-lable">订单金额：</div>
        <div class="service-item-content-value">
          <peace-price v-bind:price="info.price"
                       v-bind:size="16"></peace-price>
        </div>
      </div>

    </div>

    <div class="footer">
      <div class="footer-left">
        订单金额：<peace-price v-bind:price="info.price"
                     v-bind:size="18"
                     class="money"></peace-price>
      </div>
      <div class="footer-right">
        <van-button round
                    type="primary"
                    size="small"
                    v-on:click="submit">提交订单</van-button>
      </div>
    </div>
    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="dialog.visible"
                   :info="dialog.data"></ExpenseDetail>
  </div>
</template>

<script>
import peace from '@src/library'
import ExpenseDetail from '@src/views/components//ExpenseDetail'

export default {
  name: 'user-servicePackage-detail-before',
  components: { ExpenseDetail },
  data() {
    return {
      info: null,
      dialog: {
        visible: false,
        data: {}
      },
      enter_time: '',
      isSend: false
    }
  },
  activated() {
    this.get()
  },
  created() {
    this.enter_time = new Date().getTime()
  },
  destroyed() {
    this.trackByConfirm()
    this.trackByLeave()
    //没有选择提交订单 而是返回时 触发
    if (!this.isSend) {
      this.trackByCommit()
    }
  },
  computed: {
    canShowRefundTip() {
      return this.info?.orderStatus == 2
    },
    canShowPhoneBox() {
      return this.phoneDialog?.data?.phone
    },
    canShowFooter() {
      return this.info?.orderStatus == 1
    }
  },
  methods: {
    trackByLeave() {
      const params = {
        page_name: '服务包确认订单页面',
        organization_name: this.info.hospitalName,
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.globalPageStop(params)
    },
    trackByConfirm() {
      const params = {
        page_address: '/servicePackage/userServicePackageDetailBefore',
        business_type: '服务包',
        order_type: '服务包',
        pay_method: '自费支付微信',
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.confirmOrder(params)
    },
    trackByCommit(type = '') {
      const params = {
        business_type: '服务包',
        click_object: type === 'apply' ? '提交订单' : '返回',
        pay_method_on_submit: '自费支付微信'
      }
      peace.service.sensors.commitOrder(params)
    },
    get() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.servicePackage.getServicePackageDetail(params).then((res) => {
        this.info = res.data
      })
    },
    submit() {
      this.trackByCommit('apply')
      this.isSend = true
      const params = {
        servicePackageId: this.info.servicePackageId
      }
      peace.service.servicePackage.submitOrder(params).then((res) => {
        this.gotoExpenseDetailPage(res.data)
      })
    },
    gotoExpenseDetailPage(data) {
      const json = {
        money: data.orderMoney, //自费金额
        moneyRecord: data.moneyRecord, //费用明细
        orderNo: data.orderNo,
        orderType: 'servicePackage'
      }
      this.dialog.visible = true
      this.dialog.data = json
    }
  }
}
</script>

<style lang="scss" scoped>
.primary {
  color: $primary;
}
.service {
  min-height: 100%;
  padding-bottom: 80px;
  background: rgba(51, 51, 51, 0.05);
  .service-item {
    padding: 16px;
    background: #fff;
    margin-bottom: 8px;
    &.flex {
      display: flex;
    }
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
      position: relative;
      padding-left: 12px;
      &::before {
        content: '';
        background: $primary;
        width: 4px;
        height: 16px;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .service-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      margin-bottom: 10px;
      .cancelTip {
        display: flex;
        align-items: center;
        .van-icon,
        .van-image {
          width: 12px;
          height: 12px;
          margin-right: 3px;
        }
        span {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 12px;
        }
      }
    }
    .service-text {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      span {
        color: $primary;
      }
    }

    .doctor-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #f5f5f5;
      margin-right: 16px;
    }
    .doctor-info {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .doctor-name {
      margin-bottom: 3px;
      span {
        &:not(:last-child) {
          margin-right: 8px;
        }
        &:first-child {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .subTitle {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      span {
        color: rgba(51, 51, 51, 0.6);
      }
    }

    .service-line {
      margin: 16px 0;
      height: 1px;
      background: rgba(51, 51, 51, 0.05);
    }

    .equity {
      border-top: 1px solid rgba(51, 51, 51, 0.05);
      border-left: 1px solid rgba(51, 51, 51, 0.05);
      .equity-item {
        line-height: 36px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        display: flex;
        &.header {
          font-weight: bold;
          background: rgb(245, 245, 245);
        }
        .equity-item-label,
        .equity-item-value {
          border-right: 1px solid rgba(51, 51, 51, 0.05);
          border-bottom: 1px solid rgba(51, 51, 51, 0.05);
          flex: 1;
          text-align: center;
        }
      }
    }
    .equity-tip {
      margin-top: 8px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 0.6);
      line-height: 24px;
      span {
        &:first-child {
          color: #333333;
        }
        &:last-child {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    .phone {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 0.6);
      line-height: 20px;
      .van-image {
        width: 12px;
        height: 12px;
        margin-right: 4px;
      }
    }

    .service-item-content {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 20px;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
      &.between {
        justify-content: space-between;
      }
      &.money {
        padding-bottom: 8px;
      }
      &.totalMoney {
        font-size: 16px;
        .service-item-content-lable {
          color: #333;
        }
        .service-item-content-value {
          color: #ff3a30;
        }
      }
      .service-item-content-lable {
        color: rgba(51, 51, 51, 0.6);
        margin-right: 8px;
      }
      .service-item-content-value {
        color: #333333;
      }
    }
  }

  .footer {
    width: 100%;
    height: 80px;
    background: #ffffff;
    box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-left {
      font-size: 16px;
      display: flex;
      align-items: center;
      .peace-price {
        color: #ff3a30;
      }
    }
    .footer-right {
      .van-button {
        width: 146px;
        height: 48px;
        font-size: 18px;
      }
    }
  }
}
</style>