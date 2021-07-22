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
            <div class="coldStorage"
                 v-bind:style="{'visibility':drug.coldStorage==1?'visible': 'hidden'}">
              冷藏
            </div>
            <div class="flex">
              <span class="drug-price-num"> ¥ {{ drug.DrugUnitPrice }}</span>
              <span class="drug-qty"> x {{ drug.DrugQty }}{{drug.DrugQtyUnit}}</span>
            </div>
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
      </div>
      <div class="pay-money">
        <div class="pay-money-label">自费金额</div>
        <div class="pay-money-value">
          <span> ¥ {{ info.orderMoney.toFixed(2) }}</span>
          <span v-if="info.refundTime"
                class="pay-money-refund"> (已退款)</span>
        </div>
      </div>
      <div class="order-status">订单状态 : {{ orderStatusText }}</div>
      <div class="cancel-list"
           v-if="cancelList.length>0">
        <!-- 取消记录 -->
        <div class="flex">
          <div class="cancel-label">取消记录</div>
          <div class="cancel-content">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in cancelList"
                                :key="index">
                <div class="title">{{getCancelText(item.cancelStatus)}} {{item.createdTime}}</div>
                <div class="content"
                     v-if="item.cancelStatus==1||item.cancelStatus==3">{{item.reason}}</div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
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
      <div class="order-item"
           v-if="info.purchaseDrugOrderStreams && info.purchaseDrugOrderStreams.length > 0 && info.shippingMethod === 1 && info.callOrderStatus >= 3 && info.callOrderStatus !== 5 && info.expressNo.length > 0">
        <div class="order-label">运单编号</div>
        <div>{{ expressNoText }}</div>
      </div>
      <div class="order-item"
           v-if="info.divisionId && info.payTime">
        <div class="order-label">发票号</div>
        <div>{{ info.divisionId }}</div>
      </div>
      <div class="order-item"
           v-if="info.payInfo.deductionTypeTxt">
        <div class="order-label">抵扣类型</div>
        <div>{{ info.payInfo.deductionTypeTxt }}</div>
      </div>
      <template v-if="info.payInfo.deductionType === 'yibaopay'">
        <div class="order-item">
          <div class="order-label">医保类型</div>
          <div>{{ info.payInfo.medicalTreatmentTypetxt }}</div>
        </div>
        <div class="order-item"
             v-if="info.payInfo.medicalTreatmentType === 2">
          <div class="order-label">病种</div>
          <div>{{ info.payInfo.diseasesTxt }}</div>
        </div>
      </template>
      <div class="order-item"
           v-if="info.payInfo.payModeTxt&&info.payTime">
        <div class="order-label">支付方式</div>
        <div>{{info.payInfo.paymentTypeTxt? info.payInfo.payModeTxt + '-' + info.payInfo.paymentTypeTxt: info.payInfo.payModeTxt }}</div>
      </div>
      <template v-if="info.purchaseDrugOrderStreams && info.purchaseDrugOrderStreams.length > 0">
        <div class="order-item"
             v-for="item in info.purchaseDrugOrderStreams"
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
        PayMode: [],
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
        return this.source.PayMode.find((item) => item.value == this.info.payMode)?.label
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
    expressNoText() {
      return this.info.expressNo.map((item) => item.expressNo).join('，')
    },
    cancelList() {
      let list = []
      list = this.info.cancelList
      if (list.length > 0) {
        if (list.length == 1) {
          //仅用户端取消需添加‘等待审核’节点，供应方取消不需要；
          //目前运营端不会展示供应方取消的取消时间列表；
          //故暂时如此处理；
          //如需展示供应方需调整接口
          list.unshift({ cancelStatusText: '等待审核', cancelStatus: 0 })
        } else {
          list.reverse()
        }
        return list
      } else {
        return []
      }
    }
  },
  async created() {
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')

    this.source.PayMode = await Peace.identity.dictionary.getList('PayMode')

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
    },
    //状态-后端定义文案['1'=>'取消申请','2'=>'取消成功','3'=>'取消失败'];
    //状态-运营端显示文案['1'=>'用户申请取消','2'=>'取消申请 已同意','3'=>'取消申请 已拒绝'];
    getCancelText(status) {
      let text = ''
      switch (status) {
        case 3:
          text = '取消申请 已拒绝'
          break
        case 2:
          text = '取消申请 已同意'
          break
        case 1:
          text = '用户申请取消'
          break
        default:
          text = '等待审核'
          break
      }
      return text
    }
  }
}
</script>
<style lang="scss" scoped>
$text: #333333;
$grey-text: rgba(51, 51, 51, 0.6);
$border-color: #eaeaea;

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
    .coldStorage {
      color: #ea3930;
      text-align: right;
    }
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
  ::v-deep .cancel-list {
    padding: 0 16px 16px 16px;
    > div + div {
      margin-top: 10px;
    }
    .cancel-content {
      flex: 1;
    }
    .cancel-label {
      min-width: 5em;
      color: $text;
      &:after {
        content: '：';
      }
    }
    .cancel-content {
      .el-timeline {
        margin-top: 10px;
      }
      .el-timeline-item {
        padding-bottom: 14px;
        &:first-child {
          .el-timeline-item__tail {
            display: block;
          }
        }
        &:last-child {
          padding-bottom: 0;
        }
      }
      .el-timeline-item__tail {
        left: 2px;
        top: 8px;
        height: calc(100% - 8px);
        background: rgba(51, 51, 51, 0.1);
      }
      .el-timeline-item__node--normal {
        left: -1px;
        width: 8px;
        height: 8px;
        background: rgba(51, 51, 51, 0.1);
      }
      .el-timeline-item__wrapper {
        top: -8px;
        padding-left: 14px;
      }
      .el-timeline-item__content {
        .title {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
        .content {
          padding: 0;
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 0.6);
          line-height: 20px;
          background: transparent;
        }
      }
    }
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
    width: 50%;
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .order-label {
      flex: none;
      width: auto;
      &:after {
        content: '：';
      }
    }
  }
}
</style>
