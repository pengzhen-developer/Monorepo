<template>
  <div>
    <div class="tips"
         v-if="info.total > 1">
      <span>共{{ info.total }}张，当前第{{ info.prescribeIndex+1 }}张（{{ info.prescribeIndex+1 }}/{{ info.total }}）</span>
      <div @click="goToNext()"
           class="next">
        <span>下一张</span>
        <i class="arrow"></i>
      </div>
    </div>
    <div class="purchase-info">
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
        <div class="order-type store"> {{paymentTypesText}} </div>

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
                 class="drug-item"
                 v-for="drug in info.drugJson">
              <div class="drug-image">
                <el-image :src="drug.DrugImage">
                  <template slot="error">
                    <el-image :src="defaultImage"></el-image>
                  </template>
                </el-image>
              </div>
              <div class="drug-info">
                <div class="drug-info-title">{{ drug.DrugName }}</div>
                <div class="drug-info-num">{{ drug.DrugSpecification }}</div>
              </div>
              <div class="drug-price">
                <div class="trademark"
                     style="visibility: hidden;">
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
          <div class="flex column total-info">
            <template v-if="info.moneyRecord&&info.moneyRecord.length>0">
              <div class="flex row justify-between"
                   v-for="(money,index) in info.moneyRecord"
                   :key="index">
                <div class="text-caption">{{money.name}}</div>
                <div class="text-caption">{{money.value}}</div>
              </div>
            </template>
            <div class="flex row justify-between">
              <div class="text-caption">{{ info.payStatus>=3||info.payTime?'实付金额':'应付金额' }}</div>
              <div class="red text-body1">
                ¥{{ info.orderMoney | toFixed2() }}
                <span v-if="info.refundTime"
                      class="gary">(已退款)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-status"
             v-bind:style="{'padding-bottom':cancelList.length>0?'0px':'16px'}">
          <div class="flex">
            <div class="order-status-label">订单状态</div>
            <div class="order-status-content">{{ getOrderStatusText(info) }}</div>
          </div>
          <!-- 取消记录 -->
          <div class="flex"
               v-if="cancelList.length>0">
            <div class="order-status-label">取消记录</div>
            <div class="order-status-content">
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
      <div class="order-fullinfo">
        <div>
          <span>订单编号</span>
          <span>{{ info.orderNo }}</span>
        </div>
        <div>
          <span>创建时间</span>
          <span>{{ info.purchaseDrugOrderStreams.length > 0 ? info.purchaseDrugOrderStreams[0].createdTime:info.createdTime}}</span>
        </div>
        <div>
          <span>支付方式</span>
          <span>{{ info.paymentTypeTxt }}</span>
        </div>
        <template v-if="timeList&&timeList.length>0">
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
  </div>

</template>
<script>
import Constant from '../constant'
export default {
  name: 'drug-purchase-order-info',
  props: {
    info: Object
  },

  data() {
    return {
      defaultImage: require('../assets/images/ic_none_drug.png'),

      source: {
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: []
      }
    }
  },

  computed: {
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
    },
    isToStore() {
      return !this.info.shippingMethod
    },

    timeList() {
      if (this.info.purchaseDrugOrderStreams.length > 0) {
        this.info.purchaseDrugOrderStreams.forEach((item, index) => {
          // 发货时间后面拼接运单编号（仅为还原UI稿）
          if (item.status == 3 && this.info.shippingMethod === 1 && this.info.callOrderStatus >= 3 && this.info.callOrderStatus !== 5) {
            return this.info.purchaseDrugOrderStreams.splice(index, 1, item, {
              createdTime: this.info.expressNo,
              timeStatusTxt: '运单编号',
              status: 9
            })
          }
        })
      }
      return Array.from(new Set(this.info.purchaseDrugOrderStreams.filter((item) => item.status > 0)))
    },

    paymentTypesText() {
      if (this.info.payMode) {
        return this.$options.filters['getEnumLable'](this.info.payMode, Constant.PAY_MODE_STATUS)
      } else {
        const paymentTypes = this.$options.filters['getEnumLable'](this.info.paymentType, Constant.PAYMENT_STATUS)
        let text = '在线支付'
        if (paymentTypes.indexOf('到店支付') != -1) {
          text = '到店支付'
        } else if (paymentTypes.indexOf('货到付款') != -1) {
          text = '货到付款'
        }
        return text
      }
    }
  },
  filters: {
    getEnumLable: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    },
    toFixed2: (value) => {
      return Number(value).toFixed(2)
    }
  },

  async created() {
    // 获取字典
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')

    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
  },
  methods: {
    getOrderStatusText(row) {
      if (row.shippingMethod.toString() === '0') {
        return this.source.SelfOrderStatus.find((item) => item.value === row.callOrderStatus.toString())?.label
      } else {
        return this.source.DistributionOrderStatus.find((item) => item.value === row.callOrderStatus.toString())?.label
      }
    },

    getPaymentStatus(status) {
      let list = status.split(',')
      const result = list.map((item) => {
        return this.$options.filters['getEnumLable'](item, Constant.PAYMENT_STATUS)
      })
      return result.join(',')
    },
    viewRpInfo() {
      const param = {
        ids: this.info.prescribeId || this.info.presIds,
        idx: 0,
        current: true
      }
      this.$emit('viewPres', param)
    },
    goToNext() {
      if (this.info.prescribeIndex == this.info.total - 1) {
        this.info.prescribeIndex = 0
      } else {
        this.info.prescribeIndex++
      }
      const param = {
        $data: this.info.$data,
        orderIds: this.info.orderIds,
        idx: this.info.prescribeIndex
      }
      this.$emit('viewPurchase', param)
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
$text: #23313f;
$grey-text: #778899;
$border-color: #eaeaea;
.tips {
  width: 100%;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  margin: 0 auto 15px;
  color: #333333;
  // padding: 0 40px;
  padding-left: 40px;
  padding-right: 13px;
  background: rgba(249, 249, 249, 1) url('../assets/images/ic_tixing.png') no-repeat;
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
      background: rgba(249, 249, 249, 1) url('../assets/images/systen-Triangle.png') no-repeat;
      margin-left: 10px;
    }
  }
}
.small-text {
  font-size: 12px;
}
::v-deep .purchase-info {
  color: $text;
  & > div {
    padding: 10px 24px;
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
      right: -16px;
      color: #fff;
      line-height: 1.75;
      padding: 0 24px;
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
  .drug-info {
    padding: 16px 16px 0 16px;
    background: #fbfbfb;
    border-bottom-width: 0;
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
      &-item {
        padding: 10px;
        border-bottom: 1px dashed #f3f3f3;
        &:first-of-type {
          padding-top: 0;
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
          color: $grey-text;
        }
      }
      &-price {
        max-width: 100px;
        padding: 4px 0;
        float: right;
        line-height: 24px;
        .trademark {
          font-size: 12px;
          color: $grey-text;
          display: flex;
          align-items: center;
          justify-content: center;
          & > .reg {
            color: var(--q-color-primary);
            font-size: 16px;
            line-height: normal;
          }
        }
      }
    }
    .total-info {
      margin-top: 15px;
      text-align: left;
      & > div {
        padding-right: 10px;
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
            padding-left: 10px;
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
    &-label,
    &-content {
      font-weight: bold;
    }
    &-content {
      flex: 1;
    }
    &-label {
      min-width: 5em;
      color: $grey-text;
      &:after {
        content: '：';
      }
    }
    &-content {
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
