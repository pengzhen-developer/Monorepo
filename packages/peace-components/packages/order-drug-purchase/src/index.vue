<!--
 * @Description: 购药订单详情
-->

<template>
  <div>

    <div class="purchase-info"
         v-if="info"
         v-loading="loading">
      <div class="store">
        <div class="store-pic">
          <el-image :src="info.drugStoreLogo"></el-image>
        </div>
        <div class="store-title q-ml-10">
          <div>
            <strong>{{ info.drugStoreName }}</strong>
            <el-button @click="viewRpInfo"
                       type="text">查看处方</el-button>
          </div>
        </div>
        <div class="order-type"
             :class="!isToStore&&'to-home'">{{info.shippingMethodTxt}}</div>
        <div class="order-type store"> {{info.payInfo?.payModeTxt}} </div>

      </div>
      <div class="address">
        <template v-if="!isToStore">
          <div class="address-label">收货信息</div>
          <div class="address-content">
            <div>
              <span>{{ info.consignee }}</span>
              <span>{{ info.tel }}</span>
            </div>
            <div>{{ info.consigneeAddress }}</div>
          </div>
        </template>
        <template v-else>
          <div class="address-label">取货人</div>
          <div class="address-content">
            <div>
              <span>{{ info.consignee }}</span>
              <span>{{ info.tel }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="drug-info">
        <div class="drugs">
          <div class="drug">
            <div :key="drug.DrugCode"
                 class="drug-item flex justify-between"
                 v-for="drug in info.drugJson">
              <div class="drug-image">
                <el-image :src="drug.DrugImage">
                  <template slot="error">
                    <el-image :src="defaultImage"></el-image>
                  </template>
                </el-image>
              </div>
              <div class="drug-info-item">
                <div class="drug-info-title">{{ drug.DrugName }}</div>
                <div class="drug-info-num">{{ drug.DrugSpecification }}</div>
              </div>
              <div class="drug-price">
                <div class="coldStorage"
                     v-bind:style="{'visibility':drug.coldStorage==1?'visible': 'hidden'}">
                  冷藏
                </div>
                <div class="flex">
                  <span class="red">¥{{ drug.DrugUnitPrice }}</span>
                  <span class="gary">x{{ drug.DrugQty }}{{drug.DrugQtyUnit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex column total-info">
            <template v-if="info.moneyRecord&&info.moneyRecord?.length>0">
              <div class="flex row justify-between"
                   v-for="(money,index) in info.moneyRecord"
                   :key="index">
                <div class="text-caption">{{money.name}}</div>
                <div class="text-caption">{{money.value}}</div>
              </div>
            </template>
            <div class="flex row justify-between">
              <div class="text-caption color-333">自费金额</div>
              <div class="red text-body1"
                   v-if="typeof(info.orderMoney)== 'number' ">
                ¥{{ info.orderMoney | toFixed2() }}
                <span v-if="info.refundTime"
                      class="gary">(已退款)</span>
              </div>
              <div class="red text-body1"
                   v-else>
                --
              </div>
            </div>
          </div>
        </div>

        <div class="order-status"
             v-bind:style="{'padding-bottom':cancelList.length>0?'0px':'16px'}">
          <div class="flex">
            <div class="order-status-label color-333">订单状态</div>
            <div class="order-status-content">{{ orderStatusText }}</div>
          </div>
          <!-- 取消记录 -->
          <div class="flex"
               v-if="cancelList.length>0">
            <div class="order-status-label">取消记录</div>
            <div class="order-status-content">
              <el-timeline>
                <el-timeline-item v-for="(item, index) in cancelList"
                                  :key="index">
                  <div class="title">{{item.remark}} {{item.createdTime}}</div>
                  <div class="content"
                       v-if="item.reason">{{item.reason}}</div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
      <div class="order-fullinfo">
        <div>
          <span>订单编号</span>
          <span>{{ info.orderNo }}</span>
        </div>

        <div>
          <span>下单时间</span>
          <span>{{info.purchaseDrugOrderStreams?.length > 0?info.purchaseDrugOrderStreams[0].createdTime: info.createdTime }}</span>
        </div>
        <template v-if="showTrackingNumber">
          <div v-for="(item,index) in info.expressNo"
               :key="index">
            <span>{{index==0?'运单编号':''}}</span>
            <span>{{item.expressOrg}} {{ item.expressNo }}</span>
          </div>
        </template>
        <div v-if="info.divisionId&&info.payTime">
          <span>发票号</span>
          <span>{{ info.divisionId }}</span>
        </div>
        <div v-if="info.payInfo?.deductionTypeTxt">
          <span>抵扣类型</span>
          <span>{{ info.payInfo?.deductionTypeTxt }}</span>
        </div>
        <template v-if="info.payInfo?.deductionType==='yibaopay'">
          <div v-if="info.payInfo?.medicalTreatmentTypetxt">
            <span>医保类型</span>
            <span>{{ info.payInfo?.medicalTreatmentTypetxt }}</span>
          </div>
          <div v-if="info.payInfo?.diseasesTxt&&info.payInfo?.medicalTreatmentType === 2">
            <span>病种</span>
            <span>{{ info.payInfo?.diseasesTxt }}</span>
          </div>
        </template>

        <div v-if="info.payInfo?.payModeTxt&&info.payTime">
          <span>支付方式</span>
          <span>{{info.payInfo?.paymentTypeTxt? info.payInfo?.payModeTxt + ' - ' + info.payInfo?.paymentTypeTxt: info.payInfo?.payModeTxt }}</span>
        </div>
        <template v-for="item in info.purchaseDrugOrderStreams">
          <div :key="item.status"
               v-if="item.status>0">
            <span>{{ item.timeStatusTxt }}</span>
            <span>{{ item.createdTime }}</span>
          </div>
        </template>

        <div v-if="info.refundTime">
          <span>退款时间</span>
          <span>{{info.refundTime}}</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import CONSTANT from './constant'
export default {
  name: 'PeaceOrderDrugPruchase',
  props: {
    data: [Object, Function]
  },

  data() {
    return {
      loading: false,
      defaultImage: require('./assets/images/ic_none_drug.png'),
      info: {},
      source: {
        ENUM_PAYMENT: CONSTANT.ENUM_PAYMENT,
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: [],
        PayMode: []
      }
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.info = await this.fetch()
        this.loading = false
      },
      immediate: true
    }
  },

  computed: {
    cancelList() {
      let list = []
      list = this.info.cancelList || []
      return list.reverse()
      // if (list.length > 0) {
      //   if (list.length == 1) {
      //     //仅用户端取消需添加‘等待审核’节点，供应方取消不需要；
      //     //目前运营端不会展示供应方取消的取消时间列表；
      //     //故暂时如此处理；
      //     //如需展示供应方需调整接口
      //     list.unshift({ cancelStatusText: '等待审核', cancelStatus: 0 })
      //   } else {
      //     list.reverse()
      //   }
      //   return list
      // } else {
      //   return []
      // }
    },
    isToStore() {
      return !this.info.shippingMethod
    },

    // paymentTypesText() {
    //   if (this.info.payMode) {
    //     return this.$options.filters['getEnumLabel'](this.info.payMode, this.source.PayMode)
    //   } else {
    //     const paymentTypes = this.$options.filters['getPaymentStatus'](this.info.paymentType, CONSTANT.ENUM_PAYMENT)
    //     let text = '在线支付'
    //     if (paymentTypes.indexOf('到店支付') != -1) {
    //       text = '到店支付'
    //     } else if (paymentTypes.indexOf('货到付款') != -1) {
    //       text = '货到付款'
    //     }
    //     return text
    //   }
    // },
    expressNoText() {
      return this.info.expressNo.map((item) => item.expressNo).join('，')
    },
    showTrackingNumber() {
      return (
        this.info.shippingMethod === 1 &&
        this.info.callOrderStatus >= 3 &&
        this.info.callOrderStatus !== 5 &&
        this.info.expressNo.length > 0 &&
        this.info.purchaseDrugOrderStreams.length > 0
      )
    },
    orderStatusText() {
      if (this.info?.shippingMethod?.toString() === '0') {
        return this.source.SelfOrderStatus.find((item) => item.value === this.info?.callOrderStatus?.toString())?.label
      } else {
        return this.source.DistributionOrderStatus.find((item) => item.value === this.info?.callOrderStatus?.toString())
          ?.label
      }
    }
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    },
    getPaymentStatus: (status, ENUM) => {
      let list = status.split(',')
      const result = list.map((value) => {
        return ENUM.find((item) => item.value == value)?.label
      })
      return result.join(',')
    },
    toFixed2: (value) => {
      return Number(value).toFixed(2)
    }
  },

  async created() {
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')
    // 获取字典
    this.source.PayMode = await Peace.identity.dictionary.getList('PayMode')

    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    },
    viewRpInfo() {
      const param = {
        ids: this.info.prescribeId
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
.coldStorage {
  color: #ea3930;
  text-align: right;
}
.color-333 {
  color: #333 !important;
}
.tips {
  width: 100%;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  margin: 0 auto 15px;
  color: #333333;
  padding-left: 40px;
  padding-right: 13px;
  background: rgba(249, 249, 249, 1) url('./assets/images/ic_tixing.png') no-repeat;
  background-position: 13px 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .next {
    cursor: pointer;
    i.arrow {
      width: 4px;
      height: 8px;
      display: inline-block;
      background: rgba(249, 249, 249, 1) url('./assets/images/systen-Triangle.png') no-repeat;
      margin-left: 10px;
    }
  }
}
.small-text {
  font-size: 12px;
}
::v-deep .purchase-info {
  color: $text;
  padding: 0 8px;
  & > div {
    padding: 10px 0px;
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
      width: 48px;
      height: 48px;
      line-height: 48px;
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
        .el-image__error {
          font-size: 0;
        }
      }
    }
    &-title {
      font-size: 16px;
      > div {
        display: flex;
        flex-direction: column;
        .el-button {
          width: 72px;
          height: 24px;
          padding: 0;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 0.2);
          color: rgba(51, 51, 51, 0.6);
          margin-top: 5px;
        }
      }
    }
    .order-type {
      position: absolute;
      top: 10px;
      right: -24px;
      color: #fff;
      line-height: 1.75;
      padding: 0 24px;
      background-color: #2699fb;
      border-radius: 15px 0 0 15px;
      &.to-home {
        background-color: #2699fb;
      }
      &.store {
        top: 40px;
        background-color: #ee9b60;
      }
    }
  }
  .address {
    border-bottom-width: 0;
  }
  .address {
    &-label,
    &-content {
      line-height: 1.75;
      display: inline-block;
      vertical-align: top;
    }
    &-label {
      white-space: nowrap;
      color: $grey-text;
      &:after {
        content: '：';
      }
    }
    &-content {
      span + span {
        margin-left: 1em;
      }
    }
  }
  .drug-info {
    padding: 16px 0 0 0;
    background: #fbfbfb;
    border-bottom-width: 0;
    .drug-info-item {
      padding-left: 8px;
      flex: 1;
      .drug-info-num {
        font-size: 14px;
        color: $grey-text;
      }
    }
    .drug-info-title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
  .drugs {
    // padding: 10px 10px 20px 10px;
    border-bottom: 1px solid $border-color;
    padding-bottom: 16px;
    margin-bottom: 16px;
    .drug {
      max-height: 260px;
      border-bottom: 1px dashed #f3f3f3;
      overflow-y: auto;
      .drug-item {
        padding: 0 16px 10px 16px;
        border-bottom: 1px dashed #f3f3f3;
        &:first-of-type {
          padding-top: 0;
          border-bottom-color: transparent;
        }
      }
      .drug-image,
      .drug-info,
      .drug-price {
        display: inline-block;
        vertical-align: middle;
      }

      .drug-image {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        overflow: hidden;
        .el-image {
          width: 100%;
          height: 100%;
          font-size: 12px;
          display: block;
        }
      }
      .drug-info {
        padding-left: 12px;
        line-height: 24px;
      }

      .drug-price {
        max-width: 100px;
        padding: 4px 0;
        float: right;
        line-height: 24px;

        .red {
          font-size: 14px;
          color: $text;
          display: flex;
          align-items: center;
          justify-content: center;
          & > .reg {
            color: var(--q-color-primary);
            font-size: 16px;
            line-height: normal;
          }
        }
        .gary {
          font-size: 14px;
          margin-left: 4px;
          color: $grey-text;
        }
      }
    }
    .total-info {
      margin-top: 15px;
      text-align: left;
      & > div {
        padding-right: 16px;
        font-size: 12px;
        line-height: 1;
        &:last-of-type {
          margin-top: 10px;
          font-size: 14px;
        }
        & > div {
          line-height: 24px;
          &:first-of-type {
            color: $grey-text;
            padding-left: 16px;
            &:after {
              content: '：';
            }
          }
        }
      }
    }
  }
  .order-status {
    > div + div {
      margin-top: 10px;
    }
    .order-status-label,
    .order-status-content {
      font-weight: bold;
    }
    .order-status-content {
      flex: 1;
    }
    .order-status-label {
      min-width: 5em;
      color: $text;
      padding-left: 16px;
      &:after {
        content: '：';
      }
    }
    .order-status-content {
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
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
        .content {
          padding: 0;
          margin: 0;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 0.6);
          line-height: 20px;
          background: transparent;
        }
      }
    }
  }
  .order-fullinfo {
    padding-bottom: 0;
    font-size: 12px;
    line-height: 1.5;
    color: $grey-text;

    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 50%;
      padding: 4px 0;
    }
    & > div > span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > div > span:first-of-type {
      flex: none;
      width: auto;
      &:after {
        content: '：';
      }
    }
  }
}
.red {
  color: #ea3930;
}
.gary {
  font-size: 12px;
  color: rgb(153, 153, 153);
}

.store-title {
  width: calc(100% - 200px);
}
</style>
