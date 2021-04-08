<template>
  <div>
    <div class="info-title">订单信息</div>
    <div class="q-pb-16">
      <div class="row q-mb-16">
        <div class="col row">
          <p>订单号：</p>
          <span>{{info.orderNo}}</span>
        </div>
        <div class="col row">
          <p>服务期限：</p>
          <span>{{getDate(info)}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col row">
          <p>交易医院：</p>
          <span>{{info.hospitalName}}</span>
        </div>
        <div class="col row">
          <p>下单手机号：</p>
          <span>{{info.tel}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col row">
          <p>下单时间：</p>
          <span>{{info.createdTime}}</span>
        </div>
        <div class="col row">
          <p>下单人：</p>
          <span>{{info.orderPerson}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col row">
          <p>签约主体：</p>
          <span>{{info.mainPartName}}</span>
        </div>
        <div class="col row">
          <p>支付时间：</p>
          <span>{{info.payTime}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col row">
          <p>支付方式：</p>
          <span>{{info.paymentType}}</span>
        </div>
        <div class="col row">
          <p>支付金额：</p>
          <span>{{info.payMoney}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col row">
          <p>订单状态：</p>
          <span>{{info.orderStatusDisplay}}</span>
        </div>
        <div class="col row">
          <p>支付状态：</p>
          <span>{{info.payStatusDisplay}}</span>
        </div>
      </div>
    </div>
    <div class="info-title">服务包信息</div>
    <div class="col q-pb-16">
      <div class="row q-mb-16">
        <p>服务包名称：</p>
        <span>{{info.servicePackageName}}</span>
      </div>
      <div class="row q-mb-8">
        <p>权益信息：</p>
        <div class="col">
          <span class="color-style"
                v-for="item in info.equitiesList"
                v-bind:key="item.equitiesId">{{item.equitiesName+" "+item.totalNum+"次 "+"(剩余"+item.residueNum+"次)"}}</span>
        </div>
      </div>
    </div>
    <div v-if="isShow">
      <div class="info-title">退款信息</div>
      <div class="col q-pb-24">
        <div class="row q-mb-16">
          <p>退款原因：</p>
          <span>{{info.refundReason}}</span>
        </div>
        <div class="row q-mb-16">
          <p>退款发起时间：</p>
          <span>{{info.refundStartTime}}</span>
        </div>
        <div class="row q-mb-16">
          <p>退款成功时间：</p>
          <span>{{info.refundEndTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: String
  },
  data() {
    return {
      info: {},
      isShow: false
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      Service.getServicePackageOrderInfo({ orderNo: this.data }).then((res) => {
        this.info = res.data
        // 有售后的订单才显示退款信息
        this.isShow = res.data.afterSaleStatus !== 0 ? true : false
      })
    },
    getDate(obj) {
      if (obj.serviceExpireDate) {
        return obj.serviceStartDate + ' — ' + obj.serviceExpireDate
      } else {
        return obj.serviceStartDate
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
  color: #333;
}
span {
  color: rgba(51, 51, 51, 0.6);
  margin-left: 12px;
  flex: 1;
}
.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 16px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
}
.color-style {
  color: rgba(51, 51, 51, 0.6);
  margin-bottom: 8px;
  display: block;
}
</style>