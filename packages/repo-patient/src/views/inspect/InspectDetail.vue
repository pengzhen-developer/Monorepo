<template>
  <div class="page"
       v-if="!loading.get">
    <div class="consult-detatil">

      <div class="module top">
        <div class="top-title">
          {{ model.orderStatusTxt }}
          <div class='type-tag'>检验</div>
        </div>
        <div class="status-message">
          {{ model.checkOrderMsg }}
        </div>
      </div>

      <div class="module">
        <DoctorCard v-bind:doctor="doctorInfo"></DoctorCard>
      </div>

      <div class="module order">
        <div class="module-item">
          <div class="title">个人信息</div>
          <FamilyCard v-bind:family="familyInfo"></FamilyCard>
        </div>
        <div class="module-item">
          <div class="title">检验信息</div>
          <InspectInfo v-bind:department="model.execDept"
                       v-bind:time="model.makeTime"></InspectInfo>
        </div>
        <div class="module-item">
          <div class="title mt16">费用明细</div>
          <div class="brief">
            <InspectCost v-bind:inspect="inspectList"></InspectCost>
          </div>
        </div>
      </div>

      <!-- 订单收费明细 -->
      <div class="module message"
           v-if="model.moneyRecord.length>0">
        <div class="module-item-content message size-14"
             v-for="(item, index) in model.moneyRecord"
             :key="index">
          <div class="module-item-label">{{item.name}}：</div>
          <div class="module-item-value">
            <span v-if="isNaN(item.value.substring(1))">{{item.value}}</span>
            <peace-price v-bind:price="item.value.substring(1)"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"
                         v-else></peace-price>
          </div>
        </div>
      </div>

      <!--  自费支付-->
      <div class="module money">
        <div class="brief right">自费金额：
          <div class="money">
            <span v-if="model.payStatus === 3"
                  style="margin-right:-20px;">（已退款）</span>
            <peace-price v-bind:price="model.payStatus >= 1 ? model.payMoney:model.orderMoney"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="16"></peace-price>
          </div>
        </div>
      </div>

      <!--订单操作时间轴-->
      <div class="module">
        <div class="module-item-content size-14">
          <div class="module-item-label">订单编号：</div>
          <div class="module-item-value">{{ model.orderNo }}</div>
        </div>
        <div class="module-item-content size-14">
          <div class="module-item-label">订单时间：</div>
          <div class="module-item-value">{{ model.createdTime | formatDate }}</div>
        </div>

        <template v-if="model.payStatus > 0">
          <div class="module-item-content size-14">
            <div class="module-item-label">病历编号：</div>
            <div class="module-item-value">{{ model.familyInfo.hisPatientId }}</div>
          </div>
          <div class="module-item-content start size-14">
            <div class="module-item-label">支付方式：</div>
            <div class="module-item-value">{{model.paymentTypeTxt}}</div>
          </div>
          <div class="module-item-content size-14">
            <div class="module-item-label">支付时间：</div>
            <div class="module-item-value">{{ model.payTime | formatDate }}</div>
          </div>
        </template>
        <div class="module-item-content size-14"
             v-if="model.orderStatus === 2">
          <div class="module-item-label">取消时间：</div>
          <div class="module-item-value">{{ model.cancelTime | formatDate }}</div>
        </div>
      </div>
      <!-- 联系客服 -->
      <div class="module phone"
           v-if="model.doctorInfo.serviceTel"
           @click="callPhone">
        <div class="module-item">
          <van-image :src="require('@src/assets/images/ic_call_default.png')"></van-image>
          <span>联系客服</span>
        </div>
      </div>

    </div>

    <!-- orderStatus 1：待支付 2：已取消 3：已完成 -->
    <!-- payStatus 0：未支付 1：已支付 2：退款中 3：已退款 -->
    <div class="page-bottom-h100"
         v-if="model.orderStatus === 1"></div>
    <div class="page-bottom page-bottom-h100"
         v-if="model.orderStatus === 1">

      <div class="count-down">
        <span>订单 </span>
        <van-count-down v-if="model.countdown > 0"
                        millisecond
                        :time="model.countdown"
                        format="mm:ss"
                        @finish="finishHander" />
        <span> 后自动关闭</span>
      </div>
      <div class="pay">
        <div class="pay-item">
          <div class="money">
            <span>应付金额 :</span>
            <peace-price v-bind:price="model.orderMoney"
                         v-bind:size="18"></peace-price>
          </div>
        </div>
        <div class="pay-item pay-justify-end">
          <van-button class="is__small"
                      round
                      @click="showCancelDialog">取消订单</van-button>
          <peace-button class="is__small"
                        @click="pay"
                        round
                        type="primary"
                        throttle
                        :throttleTime="3000">
            立即支付
          </peace-button>
        </div>
      </div>
    </div>

    <!-- 电话弹框 -->
    <CallPhone v-model="phoneDialog.visible"
               :phone="phoneDialog.phone"></CallPhone>

    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="payDialog.visible"
                   @changeFlag="changeFlag"
                   :info="payDialog.data"></ExpenseDetail>

    <!-- 取消申请发票提示 -->
    <ApplyForInvoice v-model="invoiceDialog.visible"
                     :message="invoiceDialog.data.message"></ApplyForInvoice>

  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Dialog, Toast, CountDown } from 'vant'
Vue.use(CountDown)
Vue.use(Toast)

import DoctorCard from './components/DoctorCard.vue'
import FamilyCard from './components/FamilyCard.vue'
import InspectInfo from './components/InspectInfo'
import InspectCost from './components/InspectCost.vue'

import CallPhone from '@src/views/components/CallPhone'
import ExpenseDetail from '@src/views/components//ExpenseDetail'
import ApplyForInvoice from '@src/views/components/ApplyForInvoice'

export default {
  components: {
    DoctorCard,
    FamilyCard,
    InspectInfo,
    InspectCost,
    ExpenseDetail,
    CallPhone,
    ApplyForInvoice,

    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      loading: {
        get: true,
        pay: false
      },
      model: {},
      // 医生信息
      doctorInfo: {},
      // 患者信息
      familyInfo: {},
      // 检验单信息
      inspectList: [],

      phoneDialog: {
        visible: false,
        phone: ''
      },

      payDialog: {
        visible: false,
        data: {}
      },

      invoiceDialog: {
        visible: false,
        data: {}
      }
    }
  },
  computed: {
    // 检验卡片类型
    inspectCmd() {
      return this.model.payStatus > 0 ? 'view' : 'remind'
    }
  },
  filters: {
    formatDate: (timestamp) => {
      return new Date(timestamp * 1000).toDate().formatDate('yyyy-MM-dd HH:mm:ss')
    }
  },

  activated() {
    this.getDetail()
  },

  methods: {
    // 获取检验单详情
    getDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.inquiry
        .getCheckOrderDetail(params)
        .then((res) => {
          // 倒计时
          res.data.countdown = (res.data.expireTime - res.data.currentTime) * 1000

          this.model = res.data
          this.doctorInfo = res.data?.doctorInfo || {}
          this.familyInfo = res.data?.familyInfo || {}
          this.inspectList = res.data?.checkOrderDetails || []
        })
        .finally(() => {
          this.loading.get = false
        })
    },
    // 联系客服
    callPhone() {
      this.phoneDialog.phone = this.model.doctorInfo.serviceTel
      this.phoneDialog.visible = true
    },
    changeFlag() {
      this.payDialog.visible = false
      this.getDetail()
    },
    // 倒计时结束回调
    finishHander() {
      Toast.loading({
        mask: true,
        duration: 1000,
        message: '订单刷新中...'
      })

      this.cancel('auto')
    },
    showCancelDialog() {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消？'
      })
        .then(() => {
          this.cancel('hand')
        })
        .catch(() => {})
    },
    // 取消
    cancel(type = 'auto') {
      let params = {
        orderNo: this.model.orderNo,
        cancelType: type == 'auto' ? 2 : 1 // 1手动 2自动
      }
      peace.service.inquiry
        .cancelcheckOrder(params)
        .then(() => {
          if (type == 'auto') {
            this.getDetail()
          } else {
            peace.util.alert('取消成功')
            this.getDetail()
          }
        })
        .catch((res) => {
          if (res.data.code == '202') {
            this.invoiceDialog.visible = true
            this.invoiceDialog.data.message = res.data.msg
          } else {
            setTimeout(() => {
              this.getDetail()
            }, 1500)
          }
        })
    },
    // 支付
    pay() {
      if (this.loading.pay) {
        return false
      }
      this.loading.pay = true
      peace.wx.pay({ orderNo: this.model.orderNo }, null, this.getDetail, this.getDetail)
    }
  }
}
</script>

<style lang="scss" scoped>
.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.size-14 {
    font-size: 14px;
    line-height: 20px;
  }
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
    .module-item-value {
      word-break: break-all;
    }
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    min-width: 5.5em;
    &.auto {
      min-width: auto;
    }
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }
}
.module-item {
  &.record {
    .title {
      margin: 0;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
}
.module-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .module-item-more {
    color: #999;
    font-weight: normal;
    padding-top: 10px;
  }
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 0.1px;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;

  .module {
    background: #fff;
    margin-top: 0;
    padding: 16px;
    margin-bottom: 8px;

    &.order {
      .module-item {
        &:first-child {
          .title {
            margin-top: 0;
          }
        }
      }
    }
    &.money {
      margin-top: -16px;
      justify-content: space-between;
      padding: 0 16px;
      .right {
        padding-top: 8px;
        padding-bottom: 16px;
        border-top: 1px dashed rgba(51, 51, 51, 0.1);
      }
    }
    &.phone {
      margin-top: -8px;

      color: rgba(51, 51, 51, 0.6);
      font-size: 14px;
      padding: 0 16px;
      .module-item {
        width: 100%;
        padding: 16px 0;
        border-top: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
      }

      .van-image {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
  .top-title {
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    // line-height: 1;
    display: flex;
    align-items: flex-end;
    margin-bottom: 9px;
  }
  .type-tag {
    padding: 3px 4px 4px 6px;
    height: 24px;
    border-radius: 8px 8px 8px 0px;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    margin-left: 4px;
    background-color: #00c6ae;
  }
  .status-message {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
  }
  .brief {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    line-height: 24px;
  }
  .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 12px;
    margin-top: 16px;
    &::before {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background: $primary;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .money {
      color: #f2223b;
    }
  }
}

.page-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  background-color: #ffffff;
}

.page-bottom-h64 {
  height: 64px !important;
}

.page-bottom-h100 {
  height: 100px !important;
}
.count-down {
  width: 100%;
  height: 36px;
  font-size: 12px;
  background: #fefceb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f96a0e;
  .van-count-down {
    color: #f96a0e;
  }
  > span {
    margin: 0 3px;
  }
}
.pay {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  .pay-item {
    display: flex;
    align-items: center;
    flex: 1;
    &.pay-justify-end {
      justify-content: flex-end;
    }
    .money {
      color: #000;
      font-size: 16px;
      .peace-price {
        color: #f2223b;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>
