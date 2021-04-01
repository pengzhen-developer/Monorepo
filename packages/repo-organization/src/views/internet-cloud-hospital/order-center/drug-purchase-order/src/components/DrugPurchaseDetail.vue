<template>
  <div class="purchase-detail">

    <div class="drug-store">
      <div class="store-content">
        <div class="store-logo">
          <el-image :src="info.drugStoreLogo"></el-image>
        </div>
        <div class="store-info">
          <div class="store-name">{{ info.drugStoreName }}</div>
          <div class="view-prescription"
               @click="viewRpInfo">查看处方</div>
        </div>
      </div>
      <div class="purchase-type">
        <div class="purchase-type-item"
             :class="!isToStore && 'to-home'">{{info.shippingMethodTxt}}</div>
        <div class="purchase-type-item payment">{{paymentTypesText}} </div>
      </div>
    </div>

    <div class="user-info">
      <div class="address-type">{{!isToStore ? '收货信息：':'自提信息：'}} </div>
      <div class="user-content">
        <div>
          <span class="q-mr-16">{{ info.consignee }}</span>
          <span>{{ info.tel }}</span>
        </div>
        <div class="user-address">{{ info.consigneeAddress }}</div>
      </div>
    </div>

    <div class="drug-order-info">

      <div class="drug-list">
        <div class="drug-item"
             v-for="drug in info.drugJson"
             :key="drug.DrugCode">
          <div class="drug-logo">
            <el-image :src="drug.DrugImage">
              <template slot="error">
                <el-image :src="require('../assets/images/ic_no_drug.png')"></el-image>
              </template>
            </el-image>
          </div>
          <div class="drug-content">
            <div class="drug-info-item">
              <div class="drug-name">{{drug.DrugName}}</div>
              <div class="drug-storage"></div>
            </div>
            <div class="drug-info-item">
              <div class="drug-specification">{{ drug.DrugSpecification }}</div>

            </div>
          </div>
          <div class="drug-price">
            <span class="drug-price-num"> ¥ {{ drug.DrugUnitPrice }}</span>
            <span class="drug-qty"> x {{ drug.DrugQty }}</span>
          </div>
        </div>
      </div>

      <div class="money-record">
        <template v-if="info.moneyRecord && info.moneyRecord.length > 0">
          <div class="money-record-item"
               v-for="item in info.moneyRecord"
               :key="item.name">
            <div class="money-record-label">{{item.name}}</div>
            <div class="money-record-value">{{ item.value }}</div>
          </div>
        </template>
        <template v-else>
          <div class="money-record-item">
            <div class="money-record-label">药品金额</div>
            <div class="money-record-value"> ¥ {{Number(info.orderMoney).toFixed(2)}}</div>
          </div>
          <div class="money-record-item"
               v-if="!isToStore">
            <div class="money-record-label">配送费</div>
            <div class="money-record-value"> ¥ {{Number(info.expressFee).toFixed(2)}}</div>
          </div>
          <div class="money-record-item"
               v-if="info.deductionMoney">
            <div class="money-record-label">商保抵扣</div>
            <div class="money-record-value">- ¥ {{Number(info.deductionMoney).toFixed(2)}}</div>
          </div>
          <template v-if="info.accountPay > 0 || info.insurePay > 0">
            <div class="money-record-item">
              <div class="money-record-label">医保统筹账户支付</div>
              <div class="money-record-value">- ¥ {{ Number(info.insurePay).toFixed(2) }}</div>
            </div>
            <div class="money-record-item">
              <div class="money-record-label">医保个人账户支付</div>
              <div class="money-record-value">- ¥ {{ Number(info.accountPay).toFixed(2) }}</div>
            </div>
          </template>
        </template>
      </div>
      <div class="pay-money">
        <div class="pay-money-label">{{ info.payStatus>=3||info.payTime?'实付金额 :':'应付金额 :' }}</div>
        <div class="pay-money-value">
          <span> ¥ {{ info.orderMoney.toFixed(2) }}</span>
          <span v-if="info.refundTime"
                class="pay-money-refund"> (已退款)</span>
        </div>
      </div>
      <div class="order-status">订单状态 : {{ orderStatusText }}</div>
    </div>

    <div class="order-detail">
      <div class="order-item">
        <div class="order-label">订单编号</div>
        <div>{{ info.orderNo }}</div>
      </div>
      <div class="order-item">
        <div class="order-label">创建时间</div>
        <div>{{ info.createdTime }}</div>
      </div>
      <div class="order-item">
        <div class="order-label">支付方式</div>
        <div>{{ info.paymentTypeTxt }}</div>
      </div>
      <template v-if="timeList && timeList.length > 0">
        <div class="order-item"
             v-for="item in timeList"
             :key="item.status">
          <div class="order-label">{{ item.timeStatusTxt }}</div>
          <div>{{ item.createdTime }}</div>
        </div>
      </template>
      <template v-else>
        <div class="order-item"
             v-if="info.payStatus >= 3 || info.payTime">
          <div class="order-label">支付时间</div>
          <div>{{ info.payTime || '--' }}</div>
        </div>
        <div class="order-item"
             v-if="info.expressNo">
          <div class="order-label">运单编号</div>
          <div>{{ info.expressNo }}</div>
        </div>
      </template>
      <div class="order-item"
           v-if="info.refundTime">
        <div class="order-label">退款时间</div>
        <div>{{info.refundTime}}</div>
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
.purchase-detail {
  padding: 0 8px;
}

.drug-store {
  position: relative;
  border-bottom: 1px solid #eaeaea;
  .store-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 0;
  }
  .store-logo {
    flex: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    .el-image {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      ::v-deep .el-image__error {
        font-size: 0;
      }
    }
  }
  .store-info {
    flex: 1;
    margin-left: 8px;
  }
  .store-name {
    max-width: 360px;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .view-prescription {
    box-sizing: border-box;
    width: 72px;
    height: 24px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid rgba(51, 51, 51, 0.2);
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.6);
    line-height: 22px;
    text-align: center;
    cursor: pointer;
  }
  .purchase-type {
    position: absolute;
    top: 12px;
    right: -24px;
    .purchase-type-item {
      width: 96px;
      height: 24px;
      margin-bottom: 6px;
      background-color: var(--q-color-primary);
      border-radius: 12px 0 0 12px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      text-align: center;
    }
    .to-home {
      background-color: #2699fb;
    }
    .payment {
      background-color: #ee9b60;
    }
  }
}

.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}

.address-type {
  flex: none;
  width: 72px;
}

.user-content {
  flex: 1;
}

.user-address {
  word-break: break-all;
  word-wrap: break-word;
}

.drug-order-info {
  margin-bottom: 16px;
  background-color: #fbfbfb;
  .drug-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-bottom: 1px dashed #eaeaea;
  }
  .drug-logo {
    flex: none;
    width: 64px;
    height: 64px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    .el-image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .drug-content {
    flex: 1;
    margin-left: 8px;
  }
  .drug-info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drug-name {
    flex: none;
    width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 24px;
  }
  .drug-specification {
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.6);
    line-height: 20px;
  }
  .drug-price {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    .drug-price-num {
      color: #333333;
    }
    .drug-qty {
      color: rgba(51, 51, 51, 0.6);
    }
  }
  .money-record {
    padding: 16px;
    .money-record-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .money-record-label {
      color: rgba(51, 51, 51, 0.6);
      &::after {
        content: ' :';
      }
    }
    .money-record-value {
      color: #333333;
    }
  }
  .pay-money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px 16px;
    border-bottom: 1px solid #eaeaea;
    .pay-money-label {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
    .pay-money-value {
      font-size: 14px;
      font-weight: 400;
      color: #ea3930;
      line-height: 20px;
    }
    .pay-money-refund {
      color: #333333;
    }
  }
  .order-status {
    padding: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
  }
}

.order-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
  .order-item {
    flex: none;
    width: 60%;
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:nth-child(2n) {
      width: 40%;
    }
  }
  .order-label:after {
    content: '：';
  }
}
</style>
