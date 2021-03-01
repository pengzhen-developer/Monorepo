<template>

  <div class="purchase-info">
    <div class="store">
      <div class="store-pic">
        <el-image :src="info.drugStoreLogo"></el-image>
      </div>
      <div class="store-title ml-sm">
        <strong>{{ info.drugStoreName }}</strong>
        <el-button @click="viewRpInfo"
                   class="ml-sm"
                   type="text">查看处方</el-button>
      </div>
      <div class="order-type"
           :class="!isToStore&&'to-home'">{{info.shippingMethodTxt}}</div>
      <div class="order-type store">{{paymentTypesText}} </div>
    </div>
    <div class="address">
      <template v-if="!isToStore">
        <div class="address-label">收货地址</div>
        <div class="address-content">
          <div>
            <span>{{ info.consignee }}</span>
            <span>{{ info.tel }}</span>
          </div>
          <div>{{ info.consigneeAddress }}</div>
        </div>
      </template>
      <template v-else>
        <div class="address-label">自提地址</div>
        <div class="address-content">
          <div>{{ info.consigneeAddress }}</div>
        </div>
        <div class="address-label">取货人</div>
        <div class="address-content">
          <div>
            <span>{{ info.consignee }}</span>
            <span>{{ info.tel }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="drugs">
      <div class="drug">
        <div :key="drug.DrugCode"
             class="drug-item"
             v-for="drug in info.drugJson">
          <div class="drug-image">
            <el-image :src="drug.DrugImage">
              <template slot="error">
                <el-image :src="require('@src/views/internet-cloud-hospital/order-center/drug-purchase-order/src/assets/images/ic_no_drug.png')"></el-image>
              </template>
            </el-image>
          </div>
          <div class="drug-info">
            <div class="drug-info-title">{{ drug.DrugName }}</div>
            <div class="drug-info-num">{{ drug.DrugSpecification }}</div>
          </div>
          <div class="drug-price">
            <div class="trademark">
              说明书
              <span class="reg"
                    title="暂无说明">&reg;</span>
            </div>
            <div>
              <span class="red">¥{{ drug.DrugUnitPrice }}</span> X
              <span>{{ drug.DrugQty }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="total-info">
        <template v-if="info.moneyRecord && info.moneyRecord.length > 0">
          <div v-for="item in info.moneyRecord"
               :key="item.name">
            <span>{{item.name}}</span>
            <span>{{ item.value }}</span>
          </div>
        </template>
        <template v-else>
          <div>
            <span>药品金额</span>
            <span>￥{{Number(info.orderMoney).toFixed(2)}}</span>
          </div>
          <div v-if="!isToStore">
            <span>配送费</span>
            <span>￥{{Number(info.expressFee).toFixed(2)}}</span>
          </div>
          <div v-if="info.deductionMoney">
            <span>商保抵扣</span>
            <span>-￥{{Number(info.deductionMoney).toFixed(2)}}</span>
          </div>
          <div v-if="info.medicalMoney">
            <span>医保抵扣</span>
            <span>-￥{{Number(info.expressFee).toFixed(2)}}</span>
          </div>
        </template>
        <div>
          <span>{{ info.payStatus>=3||info.payTime?'实付金额':'应付金额' }}</span>
          <span class="red">¥{{ info.orderMoney.toFixed(2) }}<span v-if="info.refundTime"
                  class="gary">(已退款)</span></span>
        </div>
      </div>
    </div>
    <div class="order-status">
      <span class="order-status-label">订单状态</span>
      <span class="order-status-content">{{ orderStatusText }}</span>
    </div>
    <div class="order-fullinfo">
      <div>
        <span>订单编号</span>
        <span>{{ info.orderNo }}</span>
      </div>
      <div>
        <span>创建时间</span>
        <span>{{ info.createdTime }}</span>
      </div>
      <div>
        <span>支付方式</span>
        <span>{{ info.paymentTypeTxt }}</span>
      </div>
      <template v-if="timeList && timeList.length > 0">
        <div v-for="item in timeList"
             :key="item.status">
          <span>{{ item.timeStatusTxt }}</span>
          <span>{{ item.createdTime }}</span>
        </div>
      </template>
      <template v-else>
        <div v-if="info.payStatus >= 3 || info.payTime">
          <span>支付时间</span>
          <span>{{ info.payTime || '--' }}</span>
        </div>
        <div v-if="info.expressNo">
          <span>运单编号</span>
          <span>{{ info.expressNo }}</span>
        </div>
      </template>
      <div v-if="info.refundTime">
        <span>退款时间</span>
        <span>{{info.refundTime}}</span>
      </div>
    </div>
  </div>

</template>
<script>
import CONSTANT from '../constant'

export default {
  name: 'DrugPurchaseDetail',
  props: {
    info: Object
  },
  data() {
    return {
      source: {
        ENUM_PAYMENT: CONSTANT.ENUM_PAYMENT,
        ENUM_PAYMODE: CONSTANT.ENUM_PAYMODE,
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: []
      }
    }
  },
  computed: {
    isToStore() {
      return !this.info.shippingMethod
    },
    orderStatusText() {
      if (this.info.shippingMethod.toString() === '0') {
        return this.source.SelfOrderStatus.find((item) => item.value === this.info.callOrderStatus.toString())?.label
      } else {
        return this.source.DistributionOrderStatus.find((item) => item.value === this.info.callOrderStatus.toString())?.label
      }
    },
    paymentTypesText() {
      if (this.info.payMode) {
        return this.source.ENUM_PAYMODE.find((item) => item.value == this.info.payMode)?.label
      } else {
        const paymentTypes = this.getPaymentStatus(this.info.paymentType)
        let text = '在线支付'
        if (paymentTypes.indexOf('到店支付') != -1) {
          text = '到店支付'
        } else if (paymentTypes.indexOf('货到付款') != -1) {
          text = '货到付款'
        }
        return text
      }
    },
    timeList() {
      this.info.purchaseDrugOrderStreams.map((item, index) => {
        /**拼接 运单编号 */
        if (item.status == 3 && this.info.shippingMethod == 1 && this.info.callOrderStatus >= 3 && this.info.callOrderStatus != 5) {
          this.info.purchaseDrugOrderStreams.splice(index, 1, item, { createdTime: this.info.expressNo, status: 9, timeStatusTxt: '运单编号' })
        }
      })
      return this.info.purchaseDrugOrderStreams.filter((item) => item.status > 0)
    }
  },
  async created() {
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')

    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
  },
  methods: {
    getPaymentStatus(status) {
      let list = status.split(',')
      const result = list.map((payment) => {
        return this.source.ENUM_PAYMENT.find((item) => item.value == payment)?.label
      })
      return result.join(',')
    },
    viewRpInfo() {
      const param = {
        presIds: this.info.prescribeId
      }
      this.$emit('viewPres', param)
    }
  }
}
</script>
<style lang="scss" scoped>
$text: #23313f;
$grey-text: #778899;
$border-color: #eee;

.small-text {
  font-size: 12px;
}
.purchase-info {
  margin: 0 -16px;
  color: $text;
  & > div {
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
    &:last-of-type {
      border-bottom: 0;
    }
  }
  .store {
    position: relative;
    &-pic,
    &-title {
      display: inline-block;
      vertical-align: middle;
    }
    &-pic {
      width: 62px;
      height: 62px;
      line-height: 62px;
      font-size: 36px;
      text-align: center;
      border: 1px solid $border-color;
      border-radius: 100%;
      overflow: hidden;
      .el-image {
        width: 100%;
        height: 100%;
        font-size: 12px;
        display: block;
        ::v-deep .el-image__error {
          font-size: 0;
        }
      }
    }
    &-title {
      font-size: 16px;
      strong,
      .el-button {
        vertical-align: middle;
      }
      .el-button {
        padding: 4px 10px;
        border-radius: 5px;
        border: 1px solid;
      }
    }
    .order-type {
      position: absolute;
      top: 10px;
      right: 0;
      color: #fff;
      line-height: 1.75;
      padding: 0 20px;
      background-color: var(--q-color-primary);
      border-radius: 15px 0 0 15px;
      &.to-home {
        background-color: var(--q-color-primary);
      }
      &.store {
        top: 40px;
        background-color: var(--q-color-warning);
      }
    }
  }
  .address {
    &-label,
    &-content {
      line-height: 1.75;
      display: inline-block;
      vertical-align: top;
    }
    &-label {
      text-align: right;
      width: 5em;
      white-space: nowrap;
      color: $grey-text;
      &:after {
        content: '：';
      }
    }
    &-content {
      padding-left: 0.5em;
      width: calc(100% - 5em);
      span + span {
        margin-left: 1em;
      }
    }
  }
  .drugs {
    padding: 10px 10px 20px 10px;
    .drug {
      max-height: 260px;
      border-bottom: 1px dashed #f3f3f3;
      overflow-y: auto;
      &-item {
        padding: 10px;
        border-bottom: 1px dashed #f3f3f3;
        &:first-of-type {
          padding-top: 0;
        }
        &:last-of-type {
          border-bottom: 0;
        }
      }
      &-image,
      &-info,
      &-price {
        display: inline-block;
        vertical-align: middle;
      }
      &-image {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        overflow: hidden;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        .el-image {
          width: 100%;
          height: 100%;
          font-size: 12px;
          display: block;
        }
      }
      &-info {
        padding-left: 12px;
        line-height: 24px;
        &-num {
          font-size: 12px;
          color: #778899;
        }
      }
      &-price {
        max-width: 100px;
        padding: 4px 0;
        float: right;
        line-height: 24px;
        .trademark {
          font-size: 12px;
          color: #778899;
          & > .reg {
            color: var(--q-color-primary);
          }
        }
      }
    }
    .total-info {
      margin-top: 15px;
      text-align: right;
      & > div {
        padding-right: 10px;
        font-size: 12px;
        line-height: 1.5;
        display: inline-block;
        &:last-of-type {
          margin-top: 10px;
          font-size: 14px;
        }
        & > span {
          &:first-of-type {
            color: $grey-text;
            width: 240px;
            text-align: right;
            display: inline-block;
            &:after {
              content: '：';
            }
          }
          &:last-of-type {
            min-width: 90px;
            display: inline-block;
          }
        }
      }
    }
  }
  .order-status {
    &-label,
    &-content {
      font-weight: bold;
    }
    &-label {
      color: $grey-text;
      &:after {
        content: '：';
      }
    }
  }
  .order-fullinfo {
    font-size: 12px;
    line-height: 1.5;
    color: $text;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 50%;
    }
    & > div > span:first-of-type {
      color: $grey-text;
      &:after {
        content: '：';
      }
    }
  }
}
.red {
  color: red;
}
.gary {
  font-size: 12px;
  color: rgb(153, 153, 153);
}
.store-title {
  width: calc(100% - 200px);
}
</style>
